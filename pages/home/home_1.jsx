import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import 'tippy.js/dist/tippy.css'
import Meta from '../../components/Meta'
import { useDispatch } from 'react-redux'
import { selectedAccount } from '../../components/header/Header01'
export let shortacc = 'Connect Wallet'

import { ethers } from 'ethers'
import { NotificationContainer, NotificationManager } from 'react-notifications'

let icoContract
let isInitialized = false
const Items_Countdown_timer = dynamic(
    () => import('../../components/items_countdown_timer'),
    {
        ssr: false,
    }
)
const Item = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const pid = router.query.item
    const [buttonText, setButtonText] = useState('Connect Wallet')

    const [showInput, setShowInput] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [amountRaise, setAmountRaise] = useState(0)

    const handleInputChange = (event) => {
        const value = event.target.value
        if (isNaN(value)) {
            return
        }
        setInputValue(value)
    }
    const handleClick = () => {
        setButtonText(shortacc)
    }

    const init = async () => {
        let provider = window.ethereum

        if (typeof provider !== 'undefined') {
            provider
                .request({ method: 'eth_requestAccounts' })
                .then((accounts) => {
                    selectedAccount = accounts[0]
                    let a = selectedAccount.toString()
                    shortacc =
                        a[0] +
                        a[1] +
                        a[2] +
                        a[3] +
                        '...' +
                        a[a.length - 4] +
                        a[a.length - 3] +
                        a[a.length - 2] +
                        a[a.length - 1]
                    setButtonText(shortacc)
                })
                .catch((err) => {
                    return
                })

            window.ethereum.on('accountsChanged', function (accounts) {
                selectedAccount = accounts[0]
                let a = selectedAccount.toString()
                shortacc =
                    a[0] +
                    a[1] +
                    a[2] +
                    a[3] +
                    '...' +
                    a[a.length - 4] +
                    a[a.length - 3] +
                    a[a.length - 2] +
                    a[a.length - 1]

                setButtonText(shortacc)
            })
        }

        // const web3 = new Web3(provider);
        const web3 = new ethers.providers.Web3Provider(provider)
        const providers = new ethers.providers.Web3Provider(window.ethereum)
        const signer = providers.getSigner()
        const ICO_Abi = [
            {
                type: 'constructor',
                inputs: [],
                stateMutability: 'nonpayable',
            },
            { type: 'fallback', stateMutability: 'payable' },
            { type: 'receive', stateMutability: 'payable' },
            {
                type: 'function',
                name: 'allowance',
                inputs: [
                    {
                        name: 'owner',
                        type: 'address',
                        internalType: 'address',
                    },
                    {
                        name: 'spender',
                        type: 'address',
                        internalType: 'address',
                    },
                ],
                outputs: [
                    { name: '', type: 'uint256', internalType: 'uint256' },
                ],
                stateMutability: 'view',
            },
            {
                type: 'function',
                name: 'approve',
                inputs: [
                    {
                        name: 'spender',
                        type: 'address',
                        internalType: 'address',
                    },
                    {
                        name: 'value',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                ],
                outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
                stateMutability: 'nonpayable',
            },
            {
                type: 'function',
                name: 'balanceOf',
                inputs: [
                    {
                        name: 'account',
                        type: 'address',
                        internalType: 'address',
                    },
                ],
                outputs: [
                    { name: '', type: 'uint256', internalType: 'uint256' },
                ],
                stateMutability: 'view',
            },
            {
                type: 'function',
                name: 'decimal',
                inputs: [],
                outputs: [
                    { name: '', type: 'uint256', internalType: 'uint256' },
                ],
                stateMutability: 'view',
            },
            {
                type: 'function',
                name: 'decimals',
                inputs: [],
                outputs: [{ name: '', type: 'uint8', internalType: 'uint8' }],
                stateMutability: 'view',
            },
            {
                type: 'function',
                name: 'invest',
                inputs: [],
                outputs: [],
                stateMutability: 'payable',
            },
            {
                type: 'function',
                name: 'name',
                inputs: [],
                outputs: [{ name: '', type: 'string', internalType: 'string' }],
                stateMutability: 'view',
            },
            {
                type: 'function',
                name: 'symbol',
                inputs: [],
                outputs: [{ name: '', type: 'string', internalType: 'string' }],
                stateMutability: 'view',
            },
            {
                type: 'function',
                name: 'tokenRate',
                inputs: [],
                outputs: [
                    { name: '', type: 'uint256', internalType: 'uint256' },
                ],
                stateMutability: 'view',
            },
            {
                type: 'function',
                name: 'totalRaised',
                inputs: [],
                outputs: [
                    { name: '', type: 'uint256', internalType: 'uint256' },
                ],
                stateMutability: 'view',
            },
            {
                type: 'function',
                name: 'totalSupply',
                inputs: [],
                outputs: [
                    { name: '', type: 'uint256', internalType: 'uint256' },
                ],
                stateMutability: 'view',
            },
            {
                type: 'function',
                name: 'transfer',
                inputs: [
                    { name: 'to', type: 'address', internalType: 'address' },
                    {
                        name: 'value',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                ],
                outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
                stateMutability: 'nonpayable',
            },
            {
                type: 'function',
                name: 'transferFrom',
                inputs: [
                    {
                        name: 'from',
                        type: 'address',
                        internalType: 'address',
                    },
                    { name: 'to', type: 'address', internalType: 'address' },
                    {
                        name: 'value',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                ],
                outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
                stateMutability: 'nonpayable',
            },
            {
                type: 'function',
                name: 'withdraw',
                inputs: [
                    { name: '_to', type: 'address', internalType: 'address' },
                    {
                        name: '_amount',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: '_token',
                        type: 'address',
                        internalType: 'address',
                    },
                ],
                outputs: [],
                stateMutability: 'nonpayable',
            },
            {
                type: 'event',
                name: 'Approval',
                inputs: [
                    {
                        name: 'owner',
                        type: 'address',
                        indexed: true,
                        internalType: 'address',
                    },
                    {
                        name: 'spender',
                        type: 'address',
                        indexed: true,
                        internalType: 'address',
                    },
                    {
                        name: 'value',
                        type: 'uint256',
                        indexed: false,
                        internalType: 'uint256',
                    },
                ],
                anonymous: false,
            },
            {
                type: 'event',
                name: 'Transfer',
                inputs: [
                    {
                        name: 'from',
                        type: 'address',
                        indexed: true,
                        internalType: 'address',
                    },
                    {
                        name: 'to',
                        type: 'address',
                        indexed: true,
                        internalType: 'address',
                    },
                    {
                        name: 'value',
                        type: 'uint256',
                        indexed: false,
                        internalType: 'uint256',
                    },
                ],
                anonymous: false,
            },
            {
                type: 'error',
                name: 'ERC20InsufficientAllowance',
                inputs: [
                    {
                        name: 'spender',
                        type: 'address',
                        internalType: 'address',
                    },
                    {
                        name: 'allowance',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'needed',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                ],
            },
            {
                type: 'error',
                name: 'ERC20InsufficientBalance',
                inputs: [
                    {
                        name: 'sender',
                        type: 'address',
                        internalType: 'address',
                    },
                    {
                        name: 'balance',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'needed',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                ],
            },
            {
                type: 'error',
                name: 'ERC20InvalidApprover',
                inputs: [
                    {
                        name: 'approver',
                        type: 'address',
                        internalType: 'address',
                    },
                ],
            },
            {
                type: 'error',
                name: 'ERC20InvalidReceiver',
                inputs: [
                    {
                        name: 'receiver',
                        type: 'address',
                        internalType: 'address',
                    },
                ],
            },
            {
                type: 'error',
                name: 'ERC20InvalidSender',
                inputs: [
                    {
                        name: 'sender',
                        type: 'address',
                        internalType: 'address',
                    },
                ],
            },
            {
                type: 'error',
                name: 'ERC20InvalidSpender',
                inputs: [
                    {
                        name: 'spender',
                        type: 'address',
                        internalType: 'address',
                    },
                ],
            },
        ]

        // console.log(chainId);

        icoContract = new ethers.Contract(
            '0xbebbd3804268b5db84cf26ebbb5ad5546e66fddc',
            ICO_Abi,
            signer
        )
        handleClick()
        isInitialized = true
    }
    const checkChain = async () => {
        const providers = new ethers.providers.Web3Provider(window.ethereum)
        const { chainId } = await providers.getNetwork()
        if (chainId != 42161) {
            NotificationManager.warning(
                'Wrong Chain! Please switch to Arbitrum One Network'
            )
            return false
        } else if (chainId == 42161) {
            return true
        }
    }
    //42161 arb one mainnet
    const invest = async () => {
        if (!isInitialized) {
            await init()
        }
        const checkChain2 = await checkChain();
        if (+inputValue < 0.001) {
            alert('Minimum investment is 0.2 ETH')
        } else if (+inputValue >= 0.001 && !checkChain2) {
            return
        } else if (+inputValue >= 0.001 && checkChain2) {
            NotificationManager.info('Loading Metamask ...')
            try {
                await icoContract.invest({
                    value: ethers.utils.parseEther(inputValue),
                })
                NotificationManager.success('Done', 'Done')
            } catch (error) {
                NotificationManager.error('Error', error.message)
            }
        }
    }

    const chandleEvent = () => {
            if (selectedAccount != undefined) {
                invest()
            } else {
                NotificationManager.error('Connect Wallet !', 'Error')
            }
    }
    return (
        <>
            <Meta
                title={`${pid} || Xhibiter | NFT Marketplace Next.js Template`}
            />
            {/*  <!-- Item --> */}

            <div className="foundation w-full max-w-[1920px]">
                <section>
                    <div className="main_ecosystem">
                        <div className="main_ecosystem_container">
                            <div className="main_ecosystem_item">
                                <img
                                    className="main_img_ecosystem_pc"
                                    src="https://athene.network/assets/ecosystem-66de8d57.svg"
                                />
                                <img
                                    className="main_img_ecosystem_mb"
                                    src="https://athene.network/assets/Ecosystem_mobi-bc744539.png"
                                />
                                <div className="max-w-[800px]">
                                    <div className="main_ecosystem_item_title">
                                        Ethereum's Layer 2 with AI Integration
                                    </div>
                                    <div className="main_ecosystem_item_sbtitle">
                                        Explore the speed and cost efficiency of
                                        Athene Network, a cutting-edge Layer 2
                                        solution for Ethereum, revolutionizing
                                        transaction experiences.
                                    </div>
                                    <div className="game-price-item hover-shape-inner">
                                        <div className="game-price-inner">
                                            <div className="total-price">
                                                <div className="price-inner flex mb-45">
                                                    <div className="image-icon">
                                                        <img
                                                            className="m-auto mb-0"
                                                            src="/images/athena.png"
                                                            alt=""
                                                            style={{}}
                                                        />
                                                    </div>
                                                    <div className="price-details">
                                                        <h3 className="mb-15">
                                                            Athene Network
                                                        </h3>
                                                        <div className="dsc">
                                                            price (ATH) = 0.005
                                                            USD
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="allocation-max text-center">
                                                <img
                                                    src="/images/icon-2.png"
                                                    alt="icon-image"
                                                />
                                            </div>
                                            <div className="targeted-raise">
                                                <div className="seles-end-text">
                                                    Sale End In
                                                </div>
                                                <Items_Countdown_timer />
                                            </div>
                                        </div>
                                        <div className="progress-inner">
                                            <div className="wp-text">
                                                <div className="all-raise mb-10">
                                                    {' '}
                                                    Total Raise{' '}
                                                    {63.02 + amountRaise} ETH ( 32.51%
                                                    )
                                                </div>
                                                <div className="allocation">
                                                    Allocation: 10 ETH(max)
                                                </div>
                                                <div className="targeted-raise-amount">
                                                    Targeted Raise 200 ETH
                                                </div>
                                            </div>
                                            <div className="sc-guJBdh juDSKX progressbar_wrapper">
                                                <div className="progress_bar">
                                                    <span
                                                        className="progress_bar_overlay"
                                                        style={{ width: '30%' }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 rounded-2lg border bg-white p-8">
                                            <div>
                                                {/* <button onClick={handleToggleInput}>Toggle Input</button> */}

                                                <input
                                                    type="js-wallet wallet bg-button-2 button-custom-app wp-join-pool"
                                                    className="dark:bg-jacarta-700 dark:border-jacarta-600 focus:ring-accent border-jacarta-100 w-full rounded-full border py-3 px-4 dark:text-white input-buy"
                                                    value={inputValue}
                                                    placeholder="ETH Amount"
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div>
                                                <button
                                                    className="js-wallet wallet bg-button-2 button-custom-app wp-join-pool"
                                                    onClick={() =>
                                                        chandleEvent()
                                                    }
                                                >
                                                    Buy
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="apply-now-component ipad-pro:pt-[200px] padding-layout-global mt-[74px] desktop:mt-0">
                    <p className="text-gradient text-heading-2-1 !text-medium text-center w-full max-w-[1200px]">
                        Millions of users and innovative mining technology await
                        your visionary idea
                    </p>
                    <p className="text-neutral-400 w-full max-w-[650px] text-center text-content-4">
                        {' '}
                        Elevate your project with the Athene Foundation. Build
                        and develop your project on the Athene Mainnet and
                        benefit from our expertise, tap-to-mine technology, and
                        access to one of the largest crypto communities.{' '}
                    </p>
                    <div
                        className="button-custom-app select-none !font-bold group w-full cursor-pointer !text-content-4 w-full max-w-[538px]"
                        style={{
                            height: 48,
                            color: 'rgb(148, 255, 223) !important',
                        }}
                    >
                        <span className="group-hover:!text-white text-lg font-semibold transition-all duration-500">
                            APPLY NOW
                        </span>
                        <div>{/**/}</div>
                    </div>
                </div>
                <div className="features-component padding-layout-global pt-[186px] desktop:pt-0">
                    <div className="features-component__list flex flex-col justify-center items-center w-full max-w-[1088px] gap-[80px]">
                        <div className="feature-item tablet:items-center w-full gap-6 flex flex-col-reverse desktop:flex-row">
                            <div className="w-full max-w-[560px] flex items-end">
                                <div className="feature-item_right bg-gradient-to-t from-[#94FFDF] via-[#131D20] to-[#94FFDF] rounded-[36px] desktop:min-h-[320px]">
                                    <div className="feature-item_body z-10 relative rounded-lg overflow-hidden bg-clip-padding flex flex-col justify-between h-full">
                                        <div className="desktop:py-[48px] desktop:px-[40px] px-4 py-7 flex flex-col gap-[30px]">
                                            <p className="text-emphasis text-heading-4 !font-medium">
                                                Driving Innovation Through
                                                Athene Mainnet
                                            </p>
                                            <p className="text-main-text text-[16px] !font-light">
                                                The Athene Foundation takes
                                                pride in overseeing the Athene
                                                Mainnet, a revolutionary
                                                blockchain platform that
                                                seamlessly integrates AI
                                                capabilities. This sophisticated
                                                network serves as the backbone
                                                for AI-centric projects,
                                                providing a robust foundation
                                                for their growth and
                                                development.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex flex-1 tablet:justify-center">
                                <img
                                    className="m-auto mb-0"
                                    src="https://athene.network/assets/item_icon_4-012e0a1f.png"
                                    alt=""
                                    style={{}}
                                />
                            </div>
                        </div>
                        <div className="feature-item tablet:items-center w-full gap-6 flex flex-col-reverse desktop:flex-row desktop:flex-row-reverse">
                            <div className="w-full max-w-[560px] flex items-end">
                                <div className="feature-item_right bg-gradient-to-t from-[#94FFDF] via-[#131D20] to-[#94FFDF] rounded-[36px] desktop:min-h-[320px]">
                                    <div className="feature-item_body z-10 relative rounded-lg overflow-hidden bg-clip-padding flex flex-col justify-between h-full">
                                        <div className="desktop:py-[48px] desktop:px-[40px] px-4 py-7 flex flex-col gap-[30px]">
                                            <p className="text-emphasis text-heading-4 !font-medium">
                                                More Than Financial Support
                                            </p>
                                            <p className="text-main-text text-[16px] !font-light">
                                                Beyond financial backing, the
                                                Athene Foundation plays a
                                                pivotal role in asset management
                                                within the network. Our
                                                dedicated team not only ensures
                                                the smooth flow of resources but
                                                also offers strategic guidance,
                                                steering the Athene Network
                                                ecosystem toward sustainable
                                                success.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex flex-1 tablet:justify-center">
                                <img
                                    className="m-auto mb-0"
                                    src="https://athene.network/assets/item_icon_1-3a105435.png"
                                    alt=""
                                    style={{ maxWidth: 300 }}
                                />
                            </div>
                        </div>
                        <div className="feature-item tablet:items-center w-full gap-6 flex flex-col-reverse desktop:flex-row">
                            <div className="w-full max-w-[560px] flex items-end">
                                <div className="feature-item_right bg-gradient-to-t from-[#94FFDF] via-[#131D20] to-[#94FFDF] rounded-[36px] desktop:min-h-[320px]">
                                    <div className="feature-item_body z-10 relative rounded-lg overflow-hidden bg-clip-padding flex flex-col justify-between h-full">
                                        <div className="desktop:py-[48px] desktop:px-[40px] px-4 py-7 flex flex-col gap-[30px]">
                                            <p className="text-emphasis text-heading-4 !font-medium">
                                                Raising Capital Through Athene
                                                Launchpad
                                            </p>
                                            <p className="text-main-text text-[16px] !font-light">
                                                By connecting startups with a
                                                vibrant community of investors
                                                and supporters, Athene Launchpad
                                                not only nurtures the startup's
                                                growth but also toward success,
                                                unlocking opportunities for both
                                                creators and investors alike.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex flex-1 tablet:justify-center">
                                <img
                                    className="m-auto mb-0"
                                    src="https://athene.network/assets/item_icon_5-32ae67a2.png"
                                    alt=""
                                    style={{}}
                                />
                            </div>
                        </div>
                        <div className="feature-item tablet:items-center w-full gap-6 flex flex-col-reverse desktop:flex-row desktop:flex-row-reverse">
                            <div className="w-full max-w-[560px] flex items-end">
                                <div className="feature-item_right bg-gradient-to-t from-[#94FFDF] via-[#131D20] to-[#94FFDF] rounded-[36px] desktop:min-h-[320px]">
                                    <div className="feature-item_body z-10 relative rounded-lg overflow-hidden bg-clip-padding flex flex-col justify-between h-full">
                                        <div className="desktop:py-[48px] desktop:px-[40px] px-4 py-7 flex flex-col gap-[30px]">
                                            <p className="text-emphasis text-heading-4 !font-medium">
                                                A Platform For Growth
                                            </p>
                                            <p className="text-main-text text-[16px] !font-light">
                                                Selected AI projects find a home
                                                on the Athene Mainnet platform,
                                                benefiting from both financial
                                                backing and the strategic
                                                support provided by the Athene
                                                Foundation. This unique
                                                combination creates an optimal
                                                environment for startups to
                                                thrive, innovate, and contribute
                                                to the ever-evolving landscape
                                                of artificial intelligence.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex flex-1 tablet:justify-center">
                                <img
                                    className="m-auto mb-0"
                                    src="https://athene.network/assets/item_icon_2-b270ac64.png"
                                    alt=""
                                    style={{}}
                                />
                            </div>
                        </div>
                        <div className="feature-item tablet:items-center w-full gap-6 flex flex-col-reverse desktop:flex-row">
                            <div className="w-full max-w-[560px] flex items-end">
                                <div className="feature-item_right bg-gradient-to-t from-[#94FFDF] via-[#131D20] to-[#94FFDF] rounded-[36px] desktop:min-h-[320px]">
                                    <div className="feature-item_body z-10 relative rounded-lg overflow-hidden bg-clip-padding flex flex-col justify-between h-full">
                                        <div className="desktop:py-[48px] desktop:px-[40px] px-4 py-7 flex flex-col gap-[30px]">
                                            <p className="text-emphasis text-heading-4 !font-medium">
                                                Crafting Strategic Directions
                                            </p>
                                            <p className="text-main-text text-[16px] !font-light">
                                                The Athene Foundation acts as
                                                the compass for the Athene
                                                Network ecosystem. We provide
                                                strategic direction, laying out
                                                a roadmap that fosters synergy
                                                and collaboration among AI
                                                projects. By curating an
                                                environment conducive to
                                                innovation, we aim to propel
                                                selected projects to new heights
                                                on the Athene Mainnet platform.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex flex-1 tablet:justify-center">
                                <img
                                    className="m-auto mb-0"
                                    src="https://athene.network/assets/item_icon_3-d2305f51.png"
                                    alt=""
                                    style={{}}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="wrap_partner_section padding-layout-global">
                    <div className="partner_section_content">
                        <h2
                            className="uppercase text-center text-gradient text-heading-2 !mb-[174px]"
                            style={{ transform: 'translateZ(0px)', opacity: 1 }}
                        >
                            PARTNERS
                        </h2>
                        <div className="relative w-full h-full max-h-[280px]">
                            <img
                                className="absolute w-full mobile:hidden h-full top-0 right-0 left-0 bottom-0"
                                src="https://athene.network/assets/bg_partner-7f6cc816.png"
                            />
                            <img
                                className="absolute hidden mobile:flex w-full h-full top-0 right-0 left-0 bottom-0"
                                src="https://athene.network/assets/bg_partner_mobile-33f45825.png"
                            />
                            <div className="grid grid-cols-4 mobile:grid-cols-2 w-full h-[280px] p-4 py-0 z-10 relative">
                                <div className="w-full flex group">
                                    <img
                                        className="m-auto w-full transition duration-500 cursor-pointer group-hover:scale-110"
                                        src="https://athene.network/assets/bybit-56969eb4.svg"
                                    />
                                </div>
                                <div className="w-full flex group">
                                    <img
                                        className="m-auto w-full transition duration-500 cursor-pointer group-hover:scale-110"
                                        src="https://athene.network/assets/coin_gecko-db5e8d04.svg"
                                    />
                                </div>
                                <div className="w-full flex group">
                                    <img
                                        className="m-auto w-full transition duration-500 cursor-pointer group-hover:scale-110"
                                        src="https://athene.network/assets/gate-478915d5.png"
                                    />
                                </div>
                                <div className="w-full flex group">
                                    <img
                                        className="m-auto w-full transition duration-500 cursor-pointer group-hover:scale-110"
                                        src="https://athene.network/assets/kucoin-fe324d05.svg"
                                    />
                                </div>
                                <div className="w-full flex group">
                                    <img
                                        className="m-auto w-full transition duration-500 cursor-pointer group-hover:scale-110"
                                        src="https://athene.network/assets/coin_market-9d5ab415.svg"
                                    />
                                </div>
                                <div className="w-full flex group">
                                    <img
                                        className="m-auto w-full transition duration-500 cursor-pointer group-hover:scale-110"
                                        src="https://athene.network/assets/mexc-ec24ea78.svg"
                                    />
                                </div>
                                <div className="w-full flex group">
                                    <img
                                        className="m-auto w-full transition duration-500 cursor-pointer group-hover:scale-110"
                                        src="https://athene.network/assets/okx-da071343.svg"
                                    />
                                </div>
                                <div className="w-full flex group">
                                    <img
                                        className="m-auto w-full transition duration-500 cursor-pointer group-hover:scale-110"
                                        src="https://athene.network/assets/bitget-d46dd462.svg"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="wrap_seen_on_section padding-layout-global">
                    <div className="seen_on_section_content">
                        <h2
                            className="text-center text-gradient text-heading-1 seen_on_title"
                            style={{ transform: 'translateZ(0px)', opacity: 1 }}
                        >
                            As Seen On{' '}
                            <img
                                className="img_border_mb"
                                src="https://athene.network/assets/border1-e323e6fd.svg"
                                alt=""
                            />
                            <img
                                className="img_border_pc"
                                src="https://athene.network/assets/borderpc-6f92dd25.svg"
                                alt=""
                            />
                        </h2>
                        <div className="main_item_seen_on">
                            <a
                                href="https://cointelegraph.com/press-releases/athene-network-hits-4-million-users-top-ethereum-layer-2"
                                target="_blank"
                                className="main_item_seen_on_btn cursor-pointer hover-text"
                            >
                                <div className="group_item_text">
                                    <div className="flex justify-center items-center active_hover">
                                        <div className="">
                                            <img
                                                className="m-auto w-full transition duration-500"
                                                src="https://athene.network/assets/Cointelegraph-7c7719ba.svg"
                                            />
                                        </div>
                                        {/**/}
                                    </div>
                                </div>
                            </a>
                            <a
                                href="https://finance.yahoo.com/news/athene-network-ath-network-crosses-160000144.html"
                                target="_blank"
                                className="main_item_seen_on_btn cursor-pointer hover-text"
                            >
                                <div className="group_item_text">
                                    <div className="flex justify-center items-center active_hover">
                                        <div className="">
                                            <img
                                                className="m-auto w-full transition duration-500"
                                                src="https://athene.network/assets/yahoo-b79cbbc9.svg"
                                            />
                                        </div>
                                        {/**/}
                                    </div>
                                </div>
                            </a>
                            <a
                                href="https://www.benzinga.com/pressreleases/24/03/g37486560/athene-network-ath-network-crosses-3-million-user-milestone-establishes-itself-as-leading-layer-2-"
                                target="_blank"
                                className="main_item_seen_on_btn cursor-pointer hover-text"
                            >
                                <div className="group_item_text">
                                    <div className="flex justify-center items-center active_hover">
                                        <div className="">
                                            <img
                                                className="m-auto w-full transition duration-500"
                                                src="https://athene.network/assets/benzinga-ef3b3e2e.svg"
                                            />
                                        </div>
                                        {/**/}
                                    </div>
                                </div>
                            </a>
                            <a
                                href="https://markets.businessinsider.com/news/stocks/athene-network-ath-network-crosses-3-million-user-milestone-establishes-itself-as-leading-layer-2-ethereum-solution-1033135189"
                                target="_blank"
                                className="main_item_seen_on_btn cursor-pointer hover-text"
                            >
                                <div className="group_item_text">
                                    <div className="flex justify-center items-center active_hover">
                                        <div className="">
                                            <img
                                                className="m-auto w-full transition duration-500"
                                                src="https://athene.network/assets/business_insider_logo-83f7f73a.svg"
                                            />
                                        </div>
                                        {/**/}
                                    </div>
                                </div>
                            </a>
                            <a
                                href="https://news.bitcoin.com/leading-the-future-of-ethereum-athene-network-ath-network-crosses-nearly-4-million-user-threshold-cementing-its-status-as-a-top-layer-2-solution/"
                                target="_blank"
                                className="main_item_seen_on_btn cursor-pointer hover-text"
                            >
                                <div className="group_item_text">
                                    <div className="flex justify-center items-center active_hover">
                                        <div className="">
                                            <img
                                                className="m-auto w-full transition duration-500"
                                                src="https://athene.network/assets/coin-a5409e5d.svg"
                                            />
                                        </div>
                                        {/**/}
                                    </div>
                                </div>
                            </a>
                            <a
                                href="https://apnews.com/press-release/marketersmedia/blockchain-bac48537008741a4629f323386d1f35e"
                                target="_blank"
                                className="main_item_seen_on_btn cursor-pointer hover-text"
                            >
                                <div className="group_item_text">
                                    <div className="flex justify-center items-center active_hover">
                                        <div className="activeAPBtn">
                                            <img
                                                className="m-auto w-full transition duration-500"
                                                src="https://athene.network/assets/ap_text-1a68db97.svg"
                                            />
                                        </div>
                                        {/**/}
                                    </div>
                                </div>
                            </a>
                            <a
                                href="https://www.streetinsider.com/Press+Releases/Athene+Network+(ATH+Network)+Crosses+3+Million+User+Milestone,+Establishes+Itself+as+Leading+Layer+2+Ethereum+Solution/22890346.html"
                                target="_blank"
                                className="main_item_seen_on_btn cursor-pointer hover-text"
                            >
                                <div className="group_item_text">
                                    <div className="flex justify-center items-center active_hover">
                                        <div className="">
                                            <img
                                                className="m-auto w-full transition duration-500"
                                                src="https://athene.network/assets/street_insider_logo-27e35d23.svg"
                                            />
                                        </div>
                                        {/**/}
                                    </div>
                                </div>
                            </a>
                            <a
                                href="https://coinmarketcap.com/community/articles/65e82d08b077505e613afe1c/"
                                target="_blank"
                                className="main_item_seen_on_btn cursor-pointer hover-text"
                            >
                                <div className="group_item_text">
                                    <div className="flex justify-center items-center active_hover">
                                        <div className="">
                                            <img
                                                className="m-auto w-full transition duration-500"
                                                src="https://athene.network/assets/coinmk-ec48d1dd.svg"
                                            />
                                        </div>
                                        {/**/}
                                    </div>
                                </div>
                            </a>
                            <a
                                href="https://www.coinspeaker.com/athene-network-crosses-4-million-user-top-layer-2-solution/"
                                target="_blank"
                                className="main_item_seen_on_btn cursor-pointer hover-text"
                            >
                                <div className="group_item_text">
                                    <div className="flex justify-center items-center active_hover">
                                        <div className="">
                                            <img
                                                className="m-auto w-full transition duration-500"
                                                src=""
                                            />
                                        </div>
                                        <span className="text-[#FFFFFF] text_seen_on">
                                            Coinspeaker
                                        </span>
                                    </div>
                                </div>
                            </a>
                            <a
                                href="https://zycrypto.com/athene-network-reaches-nearly-4m-user-threshold-cementing-position-as-top-layer-2-solution/"
                                target="_blank"
                                className="main_item_seen_on_btn cursor-pointer hover-text"
                            >
                                <div className="group_item_text">
                                    <div className="flex justify-center items-center active_hover">
                                        <div className="">
                                            <img
                                                className="m-auto w-full transition duration-500"
                                                src="https://athene.network/assets/ZyCrypto_White_Logo-4d38fa9e.svg"
                                            />
                                        </div>
                                        {/**/}
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <NotificationContainer />
            {/* <!-- end item --> */}
        </>
    )
}

export default Item

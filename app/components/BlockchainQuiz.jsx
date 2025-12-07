"use client";

import React, { useState, useEffect } from 'react';
import { ChevronRight, CheckCircle2, Circle, BookOpen, Award, Zap } from 'lucide-react';

const quizData = [
  { q: "什么是区块链？", a: "区块链是一种去中心化、公开透明、不可篡改的分布式账本。", category: "区块链基础" },
  { q: "区块链的区块是什么？", a: "区块是交易数据的集合。", category: "区块链基础" },
  { q: "区块链的链如何形成？", a: "每个区块包含前一区块哈希，串成链式结构。", category: "区块链基础" },
  { q: "什么是去中心化？", a: "去中心化指无需单点机构，全网共同维护。", category: "区块链基础" },
  { q: "区块链为什么不可篡改？", a: "因为链上数据由共识机制和加密哈希保护，不可随意修改。", category: "区块链基础" },
  { q: "什么是共识机制？", a: "网络节点共同确认区块的规则与方法。", category: "区块链基础" },
  { q: "POW 与 POS 的区别是什么？", a: "POW 通过算力竞争;POS 通过质押选取验证者。", category: "区块链基础" },
  { q: "为什么比特币需要挖矿？", a: "挖矿用于验证交易、打包区块，并获得奖励。", category: "区块链基础" },
  { q: "什么是区块高度？", a: "当前链上已产生的区块数量。", category: "区块链基础" },
  { q: "什么是 Gas?", a: "交易在链上执行需要支付给矿工/验证者的费用。", category: "区块链基础" },
  { q: "什么是私钥？", a: "控制钱包资产的核心密钥。", category: "区块链基础" },
  { q: "什么是公钥？", a: "由私钥推导出的公开密钥。", category: "区块链基础" },
  { q: "公钥和地址的关系？", a: "地址由公钥进一步哈希或编码生成。", category: "区块链基础" },
  { q: "为什么私钥不能泄露？", a: "私钥泄露即意味着资产被他人完全控制。", category: "区块链基础" },
  { q: "什么是助记词？", a: "方便记忆私钥的 12~24 个英文单词。", category: "区块链基础" },
  { q: "助记词如何生成？", a: "通过 BIP39 标准由随机数生成。", category: "区块链基础" },
  { q: "助记词与私钥的关系？", a: "助记词可派生出私钥。", category: "区块链基础" },
  { q: "钱包是存币还是存私钥？", a: "钱包不存币，存私钥。", category: "区块链基础" },
  { q: "什么是链上？", a: "发生在区块链上的行为。", category: "区块链基础" },
  { q: "什么是链下？", a: "发生在链外（服务器、本地）的行为。", category: "区块链基础" },
  
  { q: "什么是 Web1、Web2、Web3?", a: "Web1:只读;Web2:读写;Web3:读写+用户拥有资产与身份。", category: "Web3概念" },
  { q: "Web3 的核心特征是什么？", a: "用户主权、去中心化、链上资产、可验证性。", category: "Web3概念" },
  { q: "Web3 如何实现用户主权？", a: "数据、资产由用户钱包控制而非平台。", category: "Web3概念" },
  { q: "钱包在 Web3 中扮演什么角色？", a: "钱包是 Web3 的 账号 + 资产管理器。", category: "Web3概念" },
  { q: "DID 是什么？", a: "去中心化身份。", category: "Web3概念" },
  { q: "什么是签名登录？", a: "通过钱包对消息签名完成登录。", category: "Web3概念" },
  { q: "为什么 Web3 不需要用户名密码？", a: "因为加密签名即证明身份。", category: "Web3概念" },
  { q: "什么是智能合约？", a: "在区块链上自动执行代码的程序。", category: "Web3概念" },
  { q: "智能合约运行在哪里？", a: "运行在智能合约平台（如以太坊）上。", category: "Web3概念" },
  { q: "为什么智能合约不能修改？", a: "合约部署后代码不可修改（除非可升级）。", category: "Web3概念" },
  { q: "什么是链上交易？", a: "提交到区块链的交易。", category: "Web3概念" },
  { q: "什么是 gas fee?", a: "执行交易需要支付网络节点的费用。", category: "Web3概念" },
  { q: "为什么不同链有不同的 gas?", a: "不同链结构不同,gas 定价也不同。", category: "Web3概念" },
  { q: "什么是 EVM?", a: "Ethereum Virtual Machine,以太坊虚拟机。", category: "Web3概念" },
  { q: "EVM 链之间有什么通用性？", a: "EVM 链可以兼容相同智能合约和工具。", category: "Web3概念" },
  { q: "什么是 Layer1?", a: "主链，如 ETH、BNB Chain、Solana。", category: "Web3概念" },
  { q: "什么是 Layer2?", a: "建在 L1 上的扩容网络，如 Arbitrum。", category: "Web3概念" },
  { q: "Rollup 是什么？", a: "将计算放 L2、数据放 L1 的扩容方案。", category: "Web3概念" },
  { q: "什么是跨链？", a: "不同链之间传递资产或信息。", category: "Web3概念" },
  { q: "为什么跨链需要桥？", a: "因链之间不能直接通信，需要中介机制（桥）。", category: "Web3概念" },

  { q: "什么是代币(Token)?", a: "运行在区块链上的数字资产。", category: "代币经济" },
  { q: "Token 和 Coin 的区别？", a: "Coin 是原生币;Token 是链上发行的代币。", category: "代币经济" },
  { q: "ERC20 是什么？", a: "以太坊代币标准。", category: "代币经济" },
  { q: "什么是通证模型(Tokenomics)?", a: "项目的代币设计、分配、经济机制。", category: "代币经济" },
  { q: "通胀型与通缩型代币的区别？", a: "通胀：供应越来越多；通缩：供应越来越少。", category: "代币经济" },
  { q: "什么是铸币(Mint)?", a: "创建新代币。", category: "代币经济" },
  { q: "什么是销毁(Burn)?", a: "销毁流通中的代币。", category: "代币经济" },
  { q: "什么是最大供应量(Max Supply)?", a: "最大供应上限。", category: "代币经济" },
  { q: "Market Cap 如何计算？", a: "Market Cap = 价格 x 流通量。", category: "代币经济" },
  { q: "FDV 是什么？", a: "FDV = 价格 x 总发行量。", category: "代币经济" },
  { q: "FDV 为什么比 MC 更能反映未来价值？", a: "FDV 反映全部代币解锁后的估值。", category: "代币经济" },
  { q: "什么是流通量(Circulating Supply)?", a: "当前市场中可自由交易的数量。", category: "代币经济" },
  { q: "为什么很多币 FDV 高但价格很低？", a: "因总量大但流通量少。", category: "代币经济" },
  { q: "什么是 Token Vesting?", a: "代币分批解锁的制度。", category: "代币经济" },
  { q: "什么是锁仓期(Cliff)?", a: "代币首次发放前的锁定期。", category: "代币经济" },
  { q: "什么是释放曲线(Vesting Schedule)?", a: "未来代币释放时间表。", category: "代币经济" },
  { q: "什么是市价单？", a: "按市价立刻成交。", category: "代币经济" },
  { q: "什么是限价单？", a: "按指定价格成交。", category: "代币经济" },
  { q: "什么是滑点？", a: "成交价与预期价格的差异。", category: "代币经济" },
  { q: "滑点过高有什么风险？", a: "易导致买太贵或卖太低。", category: "代币经济" },
  { q: "什么是链上流动性？", a: "交易对中可供交换的资产数量。", category: "代币经济" },
  { q: "什么是价格影响?", a: "因流动性不足导致价格剧烈变化。", category: "代币经济" },
  { q: "为什么新币容易被拉爆价格？", a: "因流动性少，一个大单会推高价格。", category: "代币经济" },
  { q: "LP 锁池是什么意思？", a: "流动性被锁在智能合约指定时间内不可取出。", category: "代币经济" },
  { q: "项目方为什么要锁池？", a: "为了防跑路、提高信任。", category: "代币经济" },

  { q: "热钱包与冷钱包区别？", a: "热钱包在线；冷钱包离线更安全。", category: "钱包与安全" },
  { q: "钱包插件与钱包应用区别？", a: "插件钱包用于浏览器;App 钱包用于手机。", category: "钱包与安全" },
  { q: "什么是 EOA 地址？", a: "普通用户钱包地址。", category: "钱包与安全" },
  { q: "什么是合约地址？", a: "存在智能合约代码的地址。", category: "钱包与安全" },
  { q: "如何判断一个地址是否是合约？", a: "看链上 code 是否为非空。", category: "钱包与安全" },
  { q: "为什么要防钓鱼网站？", a: "假网站诱导输入助记词。", category: "钱包与安全" },
  { q: "什么是授权(approve)?", a: "授权合约可动用你的代币额度。", category: "钱包与安全" },
  { q: "授权过高有什么风险？", a: "项目可能盗取代币。", category: "钱包与安全" },
  { q: "什么是revoke?", a: "收回授权。", category: "钱包与安全" },
  { q: "如何检查钱包是否被授权？", a: "通过区块浏览器或 revoke 工具查看。", category: "钱包与安全" },
  { q: "什么是代币空投骗局?", a: "假空投诱导授权或签名。", category: "钱包与安全" },
  { q: "为什么不要点击陌生 Token?", a: "陌生代币可能诱导骗局。", category: "钱包与安全" },
  { q: "什么是 MEV?", a: "矿工或机器人捕捉套利机会。", category: "钱包与安全" },
  { q: "什么是机器人抢跑？", a: "机器人提前发送交易抢跑用户交易。", category: "钱包与安全" },
  { q: "什么是蜜罐(Honeypot)代币？", a: "可买但不能卖的欺诈代币。", category: "钱包与安全" },
  { q: "如何判断代币能否卖出？", a: "通过 honeypot 检测工具。", category: "钱包与安全" },
  { q: "什么是 Rug Pull?", a: "项目方撤走流动性导致价格归零。", category: "钱包与安全" },
  { q: "什么是地毯式撤池？", a: "LP 资金突然清空。", category: "钱包与安全" },
  { q: "什么是预挖矿?", a: "项目方预先铸造大量代币。", category: "钱包与安全" },
  { q: "什么是增发风险?", a: "可增发意味着价格可能被稀释。", category: "钱包与安全" },
  { q: "什么是智能合约漏洞？", a: "合约代码中的安全问题。", category: "钱包与安全" },
  { q: "Reentrancy(重入攻击)是什么?", a: "攻击者通过回调重复提现。", category: "钱包与安全" },
  { q: "什么是闪电贷攻击？", a: "利用闪电贷进行大规模套利/操控。", category: "钱包与安全" },
  { q: "什么是钓鱼签名？", a: "引诱签署恶意交易。", category: "钱包与安全" },
  { q: "如何防止助记词泄漏？", a: "妥善保存、不要输入到陌生网站。", category: "钱包与安全" },

  { q: "什么是 DEX?", a: "去中心化交易所。", category: "DEX基础" },
  { q: "DEX 与 CEX 的区别？", a: "DEX 无需托管资产;CEX 由中心化机构控制资产。", category: "DEX基础" },
  { q: "什么是 AMM?", a: "Automated Market Maker。", category: "DEX基础" },
  { q: "AMM 自动做市商如何定价？", a: "通过公式自动定价（如 x*y=k)。", category: "DEX基础" },
  { q: "什么是 x*y=k?", a: "Uniswap 的核心 AMM 定价模型。", category: "DEX基础" },
  { q: "流动性池 LP 是什么？", a: "提供流动性的资产对。", category: "DEX基础" },
  { q: "LP 如何赚取手续费？", a: "从用户交易手续费中获得收益。", category: "DEX基础" },
  { q: "LP 有亏损风险吗？", a: "有，价格波动会产生无常损失。", category: "DEX基础" },
  { q: "什么是无常损失？", a: "LP 和持币对比时因价格变化造成的损失。", category: "DEX基础" },
  { q: "为什么 IL 发生在价格波动时？", a: "价格偏离初始比例时出现 IL。", category: "DEX基础" },
  { q: "稳定币池为什么 IL 小？", a: "稳定币价格波动小，因此 IL 小。", category: "DEX基础" },
  { q: "什么是 swap?", a: "在 DEX 中兑换代币。", category: "DEX基础" },
  { q: "什么是价格预言机？", a: "提供资产价格数据的系统。", category: "DEX基础" },
  { q: "什么是 TWAP?", a: "时间加权平均价格。", category: "DEX基础" },
  { q: "什么是 DEX 聚合器？", a: "汇聚多个 DEX 的最佳报价。", category: "DEX基础" },
  { q: "什么是限价单 DEX?", a: "在链上实现限价单挂单成交。", category: "DEX基础" },
  { q: "什么是 perp 永续合约？", a: "永续期货，无交割日期。", category: "DEX基础" },
  { q: "perp 如何做到没有交割？", a: "通过资金费率保持价格锚定。", category: "DEX基础" },
  { q: "什么是资金费率？", a: "多空头之间的成本平衡机制。", category: "DEX基础" },
  { q: "为什么资金费率有正负？", a: "当多头多时费率为正，空头多时为负。", category: "DEX基础" },
  { q: "什么是订单簿 DEX?", a: "使用订单簿撮合的 DEX。", category: "DEX基础" },
  { q: "什么是 AMM+Orderbook 混合？", a: "混合了 AMM 和订单簿优点。", category: "DEX基础" },
  { q: "什么是 concentrated liquidity?", a: "将流动性集中在特定价格区间。", category: "DEX基础" },
  { q: "为什么 V3 LP 更难做？", a: "需手动设置区间，操作更复杂。", category: "DEX基础" },
  { q: "什么是流动性激励(Liquidity Mining)?", a: "通过奖励代币来吸引 LP。", category: "DEX基础" },

  { q: "什么是链上借贷？", a: "在链上抵押资产借出另一资产。", category: "借贷与收益" },
  { q: "借贷为什么需要超额抵押？", a: "无信用担保，因此需超额抵押。", category: "借贷与收益" },
  { q: "清算如何发生？", a: "抵押物价格下跌时被强制卖出偿还。", category: "借贷与收益" },
  { q: "什么是清算阈值？", a: "触发清算的抵押率。", category: "借贷与收益" },
  { q: "清算惩罚是什么？", a: "借款人需额外支付的惩罚费用。", category: "借贷与收益" },
  { q: "什么是稳定币？", a: "价值相对稳定的代币。", category: "借贷与收益" },
  { q: "同质化与非同质化稳定币区别？", a: "抵押型 vs 算法型。", category: "借贷与收益" },
  { q: "为什么 USDT 能稳定？", a: "由商业票据、储备资产支持。", category: "借贷与收益" },
  { q: "为什么 UST 会崩？", a: "因机制失衡导致脱锚。", category: "借贷与收益" },
  { q: "什么是算法稳定币？", a: "通过算法调节供需维持价格。", category: "借贷与收益" },
  { q: "什么是 LST(质押以太币)?", a: "质押 ETH 获得的代表票据。", category: "借贷与收益" },
  { q: "LSD 的收益来自哪里？", a: "来自 staking 奖励。", category: "借贷与收益" },
  { q: "什么是再质押(Restaking)?", a: "在已质押资产基础上再次提供安全或服务。", category: "借贷与收益" },
  { q: "EigenLayer 的核心理念是什么？", a: "重用 ETH 质押安全性。", category: "借贷与收益" },
  { q: "什么是收益聚合器？", a: "帮用户自动寻找最高收益。", category: "借贷与收益" },
  { q: "什么是 vault?", a: "提供自动化策略的资产池。", category: "借贷与收益" },
  { q: "vault 如何自动复投？", a: "自动复利赚取最大收益。", category: "借贷与收益" },
  { q: "什么是 LP Farming?", a: "做 LP 并领取额外奖励。", category: "借贷与收益" },
  { q: "APR 和 APY 的区别？", a: "APR 是年化收益率;APY 是复利收益率。", category: "借贷与收益" },
  { q: "什么是多重签名(Multisig)?", a: "多人共同控制钱包。", category: "借贷与收益" },
  { q: "为什么项目组要用多签？", a: "防止单人作恶，提高安全。", category: "借贷与收益" },
  { q: "DAO 是什么？", a: "去中心化自治组织。", category: "借贷与收益" },
  { q: "DAO 如何治理？", a: "通过代币投票治理项目。", category: "借贷与收益" },
  { q: "提案如何投票？", a: "提案 > 投票 > 执行。", category: "借贷与收益" },
  { q: "什么是 Gas War?", a: "多人争夺同一笔交易导致 gas 上升。", category: "借贷与收益" },
  { q: "什么是财富效应在 DeFi 中的表现？", a: "资产上涨带来的参与意愿提升。", category: "借贷与收益" },
  { q: "什么是 Token 发行模型(IFO/IDO/IEO)?", a: "不同的代币发行方式。", category: "借贷与收益" },
  { q: "流动性引导(LBP)是什么?", a: "利用价格曲线调整发行的机制。", category: "借贷与收益" },
  { q: "什么是 RWA?", a: "现实资产代币化。", category: "借贷与收益" },
  { q: "为什么 2024-2025 RWA 爆发？", a: "因高利率和传统资产上链需求增强。", category: "借贷与收益" },
  { q: "什么是 DePIN?", a: "去中心化实体基础设施网络。", category: "借贷与收益" },
  { q: "什么是 AI + Crypto?", a: "AI 与区块链结合的应用领域。", category: "借贷与收益" },
  { q: "为什么 AI 需要 Token 激励？", a: "Token 激励可驱动算力贡献与数据提供。", category: "借贷与收益" },
  { q: "什么是 Meme 币？", a: "具有文化、社区属性的代币。", category: "借贷与收益" },
  { q: "Meme 币为什么可以涨几百倍？", a: "因社区共识强、流通盘小、投机性强。", category: "借贷与收益" },

  { q: "什么是公链生态？", a: "一个主链周围的项目、协议、用户体系。", category: "公链生态" },
  { q: "ETH 为什么是最大生态？", a: "生态完整、资金最丰富、开发者最多。", category: "公链生态" },
  { q: "BNB Chain 的特点？", a: "便宜、兼容 EVM。", category: "公链生态" },
  { q: "Solana 为什么 TPS 高？", a: "高性能架构、并行处理。", category: "公链生态" },
  { q: "Solana 为什么不兼容 EVM?", a: "代码架构完全不同。", category: "公链生态" },
  { q: "TON 的优势是什么？", a: "用户入口来自 Telegram。", category: "公链生态" },
  { q: "TON 能否成为新入口？", a: "用户基数大、门槛低，潜力强。", category: "公链生态" },
  { q: "什么是 modular blockchain?", a: "模块化链将执行、结算、DA 分离。", category: "公链生态" },
  { q: "什么是 data availability?", a: "保存区块数据可用性的模块。", category: "公链生态" },
  { q: "Celestia 的核心创新是什么？", a: "将执行与 DA 分离，降低成本。", category: "公链生态" },
  { q: "什么是 Rollup-as-a-Service?", a: "Rollup 的托管服务。", category: "公链生态" },
  { q: "什么是 Cosmos IBC?", a: "Cosmos 链之间的通信协议。", category: "公链生态" },
  { q: "什么是 Polkadot 平行链？", a: "Polkadot 主链与多条平行链协作。", category: "公链生态" },
  { q: "以太坊转向 POS 的意义？", a: "使 ETH 节能并可加速扩容路线。", category: "公链生态" },
  { q: "EIP-1559 是什么？", a: "改进 gas 机制，引入基础销毁。", category: "公链生态" },
  { q: "为什么 ETH 会 deflationary?", a: "因 gas 被销毁导致供应减少。", category: "公链生态" },
  { q: "什么是以太坊三难性？", a: "不可能兼顾安全、去中心化、性能。", category: "公链生态" },
  { q: "为什么 L2 能缓解扩容问题？", a: "将执行移到 L2。", category: "公链生态" },
  { q: "什么是 ZK?", a: "零知识证明技术。", category: "公链生态" },
  { q: "ZK 与 Optimistic Rollup 区别？", a: "ZK 更快确认,Optimistic 有挑战期。", category: "公链生态" },

  { q: "游戏链(GameFi)是什么？", a: "在链上运行的游戏经济系统。", category: "应用场景" },
  { q: "为什么 90% GameFi 无法持续？", a: "依赖新资金，缺乏可持续玩法。", category: "应用场景" },
  { q: "去中心化社交(SocialFi)逻辑是什么?", a: "用链上资产激励社交行为。", category: "应用场景" },
  { q: "NFT 的本质是什么？", a: "区块链上的独一无二资产。", category: "应用场景" },
  { q: "NFT metadata 存在哪里？", a: "通常存储在 IPFS 或 Arweave。", category: "应用场景" },
  { q: "什么是 NFT 地板价？", a: "当前最低成交价格。", category: "应用场景" },
  { q: "什么是 Token-gated 内容？", a: "只有持有指定 NFT 才能访问内容。", category: "应用场景" },
  { q: "区块链如何服务供应链？", a: "溯源、记录不可篡改。", category: "应用场景" },
  { q: "区块链如何服务金融？", a: "跨境支付、清算更快。", category: "应用场景" },
  { q: "区块链如何服务跨境结算？", a: "用链上结算提高效率。", category: "应用场景" },
  { q: "区块链如何防伪？", a: "商品信息不可篡改防伪。", category: "应用场景" },
  { q: "区块链能存大型文件吗？", a: "不行，可存指纹或引用。", category: "应用场景" },
  { q: "什么是去中心化存储？", a: "把文件分布式存储在节点网络。", category: "应用场景" },
  { q: "IPFS 与 Arweave 区别？", a: "IPFS 可变;Arweave 永久存储。", category: "应用场景" },
  { q: "区块链为什么适合激励系统？", a: "激励贡献者参与网络。", category: "应用场景" },
  { q: "什么是项目生命周期?", a: "项目从启动到成熟的全过程。", category: "应用场景" },
  { q: "一个优质项目要看哪些指标？", a: "用户、产品、合约安全、数据。", category: "应用场景" },
  { q: "为什么团队透明度很重要？", a: "团队透明影响信任。", category: "应用场景" },
  { q: "为什么链上数据可验证很关键？", a: "数据可链上验证减少欺诈。", category: "应用场景" },
  { q: "什么是真实用户和机器人用户的区别？", a: "真实用户行为复杂，机器人行为单一。", category: "应用场景" },

  { q: "如何用区块浏览器查看交易？", a: "用区块浏览器(Etherscan/BscScan)。", category: "实操技能" },
  { q: "如何查看代币是否安全？", a: "查看是否开源、可升级、是否增发、是否锁池。", category: "实操技能" },
  { q: "如何判断合约是否开源？", a: "看合约是否显示Verified。", category: "实操技能" },
  { q: "如何查看合约是否可升级？", a: "查看 Proxy / Implementation 地址。", category: "实操技能" },
  { q: "如何查看项目方是否弃权？", a: "是否 renounceOwnership。", category: "实操技能" },
  { q: "怎么看 LP 是否锁定？", a: "通过锁仓平台或合约查看 LP 是否锁定。", category: "实操技能" },
  { q: "如何查看钱包的授权记录？", a: "通过 revoke.cash / 浏览器 token approvals。", category: "实操技能" },
  { q: "如何用 DEX 分析工具查看流动性？", a: "Dexscreener、DefiLlama、Dune 等工具。", category: "实操技能" },
  { q: "如何查看巨鲸买卖？", a: "追踪大额钱包行为。", category: "实操技能" },
  { q: "如何追踪新项目部署？", a: "监控链上部署事件。", category: "实操技能" },
  { q: "如何在链上验证空投真实性？", a: "通过官网、官方渠道验证。", category: "实操技能" },
  { q: "如何避免 AirDrop 钓鱼？", a: "不点击陌生空投、不授权可疑地址。", category: "实操技能" },
  { q: "如何设置安全的滑点？", a: "根据流动性设置 0.5% - 5% 滑点。", category: "实操技能" },
  { q: "如何识别 Honeypot?", a: "用 honeypot 检测或模拟卖出。", category: "实操技能" },
  { q: "如何识别机器人地址？", a: "机器人交易频繁、账户创建新、无交互。", category: "实操技能" },
  { q: "如何判断一个项目是不是骗局？", a: "看是否锁池、是否可升级、是否透明。", category: "实操技能" },
  { q: "如何识别庞氏模型？", a: "靠新资金维持收益的即庞氏。", category: "实操技能" },
  { q: "如何判断一个项目是否持续经营？", a: "看产品、团队、更新频率。", category: "实操技能" },
  { q: "如何识别项目是否有真实产品？", a: "是否有真实用户与营收。", category: "实操技能" },
  { q: "如何进行链上数据分析？", a: "使用链上数据工具。", category: "实操技能" },
  { q: "如何查看 token 经济模型？", a: "查看分配、释放、通缩机制。", category: "实操技能" },
  { q: "如何分析代币的通缩机制？", a: "分析税收、买卖机制、销毁逻辑。", category: "实操技能" },
  { q: "如何判断是否值得做 LP?", a: "看 IL 风险、交易量、手续费情况。", category: "实操技能" },
  { q: "如何检测资金盘信号？", a: "是否承诺高收益、团队匿名、无产品。", category: "实操技能" },
  { q: "如何跟踪项目方跑路迹象？", a: "大额转移、社群关闭、更新停止。", category: "实操技能" },
  { q: "如何分析一个新 Meme 币？", a: "看流动性、开源、税率、增发权。", category: "实操技能" },
  { q: "如何做链上地址画像？", a: "分析行为模式、交易、链上社交。", category: "实操技能" },
  { q: "如何查看某地址是否为项目方？", a: "查看是否持有大量预挖份额。", category: "实操技能" },
  { q: "如何判断合约是否存在漏洞？", a: "用审计、扫描工具检测漏洞。", category: "实操技能" },
  { q: "如何构建自己的学习路径？", a: "了解基础 → 工具 → 生态 → 安全 → 实操路径。", category: "实操技能" }
]

export default function BlockchainQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completed, setCompleted] = useState([]);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 10 + Math.random() * 20,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  const currentQ = quizData[currentIndex];
  const progress = ((currentIndex + 1) / quizData.length) * 100;

  const handleNext = () => {
    if (!completed.includes(currentIndex)) {
      setCompleted([...completed, currentIndex]);
    }
    if (currentIndex < quizData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">
      {/* Animated Background Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30 animate-pulse"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-6 py-2 mb-4">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300 text-sm font-mono">Web3 Training System</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            区块链 / Web3 / DeFi 讲师培训
          </h1>
          <p className="text-gray-400">共 {quizData.length} 题 · 系统化学习路径</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-cyan-400 font-mono">进度 {currentIndex + 1}/{quizData.length}</span>
            <span className="text-purple-400 font-mono">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden border border-cyan-500/20">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 shadow-2xl shadow-cyan-500/10 mb-6">
          {/* Category Badge */}
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-5 h-5 text-purple-400" />
            <span className="text-purple-300 text-sm font-semibold px-3 py-1 bg-purple-500/10 rounded-full border border-purple-500/30">
              {currentQ.category}
            </span>
          </div>

          {/* Question */}
          <div className="mb-8">
            <div className="flex items-start gap-4">
              <span className="text-5xl font-bold text-cyan-400/20 font-mono">Q</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white leading-relaxed pt-2">
                {currentQ.q}
              </h2>
            </div>
          </div>

          {/* Answer Section */}
          <div className="min-h-[200px]">
            {!showAnswer ? (
              <button
                onClick={() => setShowAnswer(true)}
                className="w-full py-4 px-6 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/30"
              >
                显示答案
              </button>
            ) : (
              <div className="animate-fadeIn">
                <div className="flex items-start gap-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-xl p-6">
                  <span className="text-4xl font-bold text-cyan-400/40 font-mono">A</span>
                  <p className="text-lg text-gray-200 leading-relaxed pt-1">{currentQ.a}</p>
                </div>
                
                <button
                  onClick={handleNext}
                  disabled={currentIndex >= quizData.length - 1}
                  className="w-full mt-6 py-4 px-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/30 flex items-center justify-center gap-2"
                >
                  {currentIndex < quizData.length - 1 ? (
                    <>
                      下一题 <ChevronRight className="w-5 h-5" />
                    </>
                  ) : (
                    <>
                      已完成 <CheckCircle2 className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="px-6 py-3 bg-slate-700/50 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg font-medium transition-all duration-200 border border-slate-600"
          >
            上一题
          </button>
          
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-400" />
            <span className="text-gray-400">已完成: <span className="text-yellow-400 font-bold">{completed.length}</span></span>
          </div>
          
          <button
            onClick={handleNext}
            disabled={currentIndex >= quizData.length - 1}
            className="px-6 py-3 bg-slate-700/50 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg font-medium transition-all duration-200 border border-slate-600"
          >
            跳过
          </button>
        </div>

        {/* Completion Message */}
        {currentIndex === quizData.length - 1 && showAnswer && (
          <div className="mt-8 p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl text-center animate-fadeIn">
            <Award className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-green-400 mb-2">恭喜完成所有题目！</h3>
            <p className="text-gray-300">你已经完成了前 {quizData.length} 道题目的学习</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
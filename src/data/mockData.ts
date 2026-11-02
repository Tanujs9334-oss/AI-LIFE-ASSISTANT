import { TaskItem, ExpenseItem, SavingsGoal, DocumentItem, BharatScheme, LearningTopic } from '../types';

export const INITIAL_TASKS: TaskItem[] = [
  {
    id: 'task-1',
    title: 'Pay Delhi Vidyut / BSES Electricity Bill',
    description: 'Consumer No: 102938491. Pay before due date to avoid surcharge.',
    category: 'Bills & Utilities' as any,
    priority: 'Urgent',
    dueDate: new Date().toISOString().split('T')[0],
    dueTime: '18:00',
    completed: false,
    recurring: 'monthly',
    reminderSet: true,
  },
  {
    id: 'task-2',
    title: 'File GSTR-3B Monthly Return',
    description: 'Compile input tax credit and reconcile purchase register for business portal.',
    category: 'Finance',
    priority: 'High',
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    dueTime: '15:00',
    completed: false,
    recurring: 'monthly',
    reminderSet: true,
  },
  {
    id: 'task-3',
    title: 'Download updated DigiLocker Driving License',
    description: 'Sync official digital vehicle papers in DigiLocker app & Bharat AI doc vault.',
    category: 'Bharat Gov',
    priority: 'Medium',
    dueDate: new Date(Date.now() + 172800000).toISOString().split('T')[0],
    completed: true,
  },
  {
    id: 'task-4',
    title: 'Revise Indian Constitution: Articles 14 to 32',
    description: 'Fundamental rights, writs in supreme court, landmark judgments for GS-II.',
    category: 'Study',
    priority: 'Medium',
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    dueTime: '20:00',
    completed: false,
  },
  {
    id: 'task-5',
    title: 'Schedule Annual Health Checkup for Parents',
    description: 'Verify Ayushman Bharat empanelled hospitals or book Max Healthcare checkup.',
    category: 'Health',
    priority: 'High',
    dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    completed: false,
  },
];

export const INITIAL_EXPENSES: ExpenseItem[] = [
  {
    id: 'exp-1',
    amount: 68500,
    category: 'Investments & Savings',
    description: 'Monthly Salary Credit - Tech Systems India',
    date: new Date().toISOString().split('T')[0],
    paymentMethod: 'Net Banking',
    type: 'income',
  },
  {
    id: 'exp-2',
    amount: 22000,
    category: 'Housing & Rent',
    description: '2BHK Apartment Rent - Bangalore Indiranagar',
    date: new Date().toISOString().split('T')[0],
    paymentMethod: 'UPI',
    type: 'expense',
  },
  {
    id: 'exp-3',
    amount: 10000,
    category: 'Investments & Savings',
    description: 'Monthly Index Mutual Fund SIP (Nifty 50)',
    date: new Date().toISOString().split('T')[0],
    paymentMethod: 'Net Banking',
    type: 'expense',
  },
  {
    id: 'exp-4',
    amount: 2150,
    category: 'Bills & Utilities',
    description: 'BSES Electricity & Fiber Broadband Bill',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    paymentMethod: 'UPI',
    type: 'expense',
  },
  {
    id: 'exp-5',
    amount: 3450,
    category: 'Groceries & Food',
    description: 'Monthly Staples & Vegetables (Blinkit + Nature Basket)',
    date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
    paymentMethod: 'UPI',
    type: 'expense',
  },
  {
    id: 'exp-6',
    amount: 850,
    category: 'Transport & Fuel',
    description: 'Namma Metro Card Recharge + Auto Rickshaw',
    date: new Date(Date.now() - 86400000 * 3).toISOString().split('T')[0],
    paymentMethod: 'UPI',
    type: 'expense',
  },
];

export const INITIAL_SAVINGS_GOALS: SavingsGoal[] = [
  {
    id: 'goal-1',
    title: 'Emergency Reserve (6 Months Expenses)',
    targetAmount: 250000,
    currentAmount: 185000,
    targetDate: '2026-12-31',
    category: 'Safety Net',
  },
  {
    id: 'goal-2',
    title: 'Ather 450X Electric Scooter',
    targetAmount: 145000,
    currentAmount: 98000,
    targetDate: '2027-03-31',
    category: 'Vehicle',
  },
  {
    id: 'goal-3',
    title: 'Diwali Family Vacation to Himachal',
    targetAmount: 60000,
    currentAmount: 42000,
    targetDate: '2026-10-25',
    category: 'Travel',
  },
];

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-1',
    title: 'Residential_Rental_Agreement_2026.pdf',
    folder: 'Identity & Legal',
    fileType: 'pdf',
    uploadDate: '2026-10-15',
    size: '1.4 MB',
    previewText: `RESIDENTIAL LEASE AGREEMENT
This agreement is executed at Bengaluru on 1st day of October 2026 between Shri R. K. Nair (Landlord) and Tanuj Sharma (Tenant).
Property: Flat 402, Sai Residency, 12th Main Road, Indiranagar, Bengaluru - 560038.
Monthly Rent: INR 22,000/- payable on or before 5th of every English calendar month.
Refundable Security Deposit: INR 1,00,000/- held without interest.
Lock-in Period: 11 months from date of execution. Maintenance charges of INR 2,500/- to be paid directly to Association.`,
    summary: 'Residential lease for Flat 402, Indiranagar, Bengaluru. Rent is ₹22,000/mo, deposit ₹1,00,000, lock-in period 11 months.',
    extractedEntities: [
      { label: 'Landlord', value: 'Shri R. K. Nair' },
      { label: 'Monthly Rent', value: '₹22,000 / month' },
      { label: 'Security Deposit', value: '₹1,00,000' },
      { label: 'Lock-in Period', value: '11 Months' },
      { label: 'Due Date', value: '5th of each month' },
    ],
  },
  {
    id: 'doc-2',
    title: 'BSES_Electricity_Bill_Oct2026.pdf',
    folder: 'Bills & Utilities',
    fileType: 'pdf',
    uploadDate: '2026-10-28',
    size: '420 KB',
    previewText: `BSES RAJDHANI POWER LIMITED
Bill Month: October 2026
CA Number: 102938491 | Meter No: DL-88912
Units Consumed: 248 kWh
Gross Amount: INR 1,640.00 | PPAC Charges: INR 180.00 | Electricity Duty: INR 82.00
Net Amount Payable: INR 1,902.00
Due Date: 12-Nov-2026 | Surcharge if paid after due date: INR 100.00`,
    summary: 'Electricity bill for CA 102938491. Payable amount ₹1,902 due on 12-Nov-2026.',
    extractedEntities: [
      { label: 'Consumer Account', value: '102938491' },
      { label: 'Units Consumed', value: '248 kWh' },
      { label: 'Total Payable', value: '₹1,902.00' },
      { label: 'Payment Due Date', value: '12-Nov-2026' },
    ],
  },
  {
    id: 'doc-3',
    title: 'Aadhaar_Update_Acknowledgment_Slip.pdf',
    folder: 'Identity & Legal',
    fileType: 'pdf',
    uploadDate: '2026-09-12',
    size: '680 KB',
    previewText: `UNIQUE IDENTIFICATION AUTHORITY OF INDIA (UIDAI)
Update Request Number (URN): 1029/39821/01928
Service: Online Address Update via DigiLocker Proof
Applicant: Tanuj Sharma | Masked Aadhaar: XXXX-XXXX-9182
Status: Completed & Approved. E-Aadhaar ready for digital download on myAadhaar portal.`,
    summary: 'UIDAI Address Update confirmation. URN 1029/39821/01928 approved and ready for e-Aadhaar download.',
    extractedEntities: [
      { label: 'URN Number', value: '1029/39821/01928' },
      { label: 'Masked Aadhaar', value: 'XXXX-XXXX-9182' },
      { label: 'Status', value: 'Approved & Downloadable' },
    ],
  },
];

export const BHARAT_SCHEMES: BharatScheme[] = [
  {
    id: 'scheme-ayushman',
    name: 'Ayushman Bharat — PM-JAY',
    nameHindi: 'आयुष्मान भारत — प्रधानमंत्री जन आरोग्य योजना',
    category: 'Healthcare',
    tagline: 'World\'s largest government-funded healthcare assurance scheme offering up to ₹5 Lakh cover per family per year.',
    officialPortal: 'https://pmjay.gov.in',
    lastVerifiedDate: '2026-10-15',
    eligibility: [
      'Families identified under Socio-Economic Caste Census (SECC 2011)',
      'Rural families with kutcha houses, landless laborers, manual scavengers',
      'Urban workers across 11 designated occupational categories (domestic workers, drivers, cobblers, rickshaw pullers, mechanics)',
      'All senior citizens aged 70+ (regardless of income) under recent expansion',
    ],
    requiredDocuments: [
      'Aadhaar Card (linked with active mobile)',
      'Ration Card / PM-JAY Eligibility Letter',
      'Proof of Identity / Address',
    ],
    stepsToApply: [
      'Visit beneficiary.nha.gov.in or download the Ayushman App',
      'Log in with your Mobile Number and verify OTP',
      'Search your name using Aadhaar number or Ration Card ID',
      'Complete e-KYC using Aadhaar facial recognition or OTP',
      'Download your instant Ayushman Card (Golden Card) for cashless hospitalization',
    ],
    hindiOverview: 'प्रति परिवार प्रति वर्ष 5 लाख रुपये तक का कैशलेस स्वास्थ्य बीमा। 27,000 से अधिक सूचीबद्ध सरकारी और निजी अस्पतालों में मुफ्त इलाज।',
    keyBenefits: [
      'Cashless & paperless access to secondary and tertiary healthcare',
      'Pre-existing conditions covered from Day 1',
      'Covers 3 days pre-hospitalization and 15 days post-hospitalization costs',
    ],
  },
  {
    id: 'scheme-digilocker',
    name: 'DigiLocker — Paperless Governance',
    nameHindi: 'डिजिलॉकर — डिजिटल इंडिया का सुरक्षित लॉकर',
    category: 'Digital Identity',
    tagline: 'Legally valid cloud repository under IT Act 2000 for storing driving license, RC, marksheets, PAN, and insurance.',
    officialPortal: 'https://www.digilocker.gov.in',
    lastVerifiedDate: '2026-10-20',
    eligibility: [
      'Any Indian citizen holding an active 12-digit Aadhaar number with linked mobile phone.',
    ],
    requiredDocuments: [
      'Aadhaar Number',
      'Mobile phone capable of receiving SMS OTP',
    ],
    stepsToApply: [
      'Visit digilocker.gov.in or open Bharat AI Document Assistant',
      'Click "Sign Up" and enter your Aadhaar Number',
      'Verify 6-digit OTP sent to Aadhaar-registered mobile',
      'Set a 6-digit security PIN for instant future access',
      'Link your driving license, vehicle RC, CBSE marksheets, and PAN card directly from issuing authorities',
    ],
    hindiOverview: 'आईटी अधिनियम 2000 के तहत आपके सभी सरकारी दस्तावेज़ (ड्राइविंग लाइसेंस, आरसी, मार्कशीट) वैध डिजिटल रूप में मान्य हैं।',
    keyBenefits: [
      'Treated at par with original physical documents by traffic police, airports, and universities',
      '1 GB free secure cloud storage backed by Government of India encryption',
      'Zero risk of losing physical paper certificates',
    ],
  },
  {
    id: 'scheme-pmkisan',
    name: 'PM-KISAN Samman Nidhi',
    nameHindi: 'प्रधानमंत्री किसान सम्मान निधि योजना',
    category: 'Agriculture & Rural',
    tagline: 'Direct income support of ₹6,000 per year in three equal 4-monthly installments of ₹2,000 transferred to farmers via DBT.',
    officialPortal: 'https://pmkisan.gov.in',
    lastVerifiedDate: '2026-10-18',
    eligibility: [
      'All landholding farmer families with cultivable land parcels in their names',
      'Exclusions: Institutional landholders, serving/retired government employees, income tax payees',
    ],
    requiredDocuments: [
      'Aadhaar Card',
      'Land Ownership Papers / Khatauni Record',
      'Active Bank Account linked with Aadhaar & NPCI Direct Benefit Transfer (DBT)',
    ],
    stepsToApply: [
      'Go to pmkisan.gov.in -> Farmers Corner -> "New Farmer Registration"',
      'Enter Aadhaar number and select Rural/Urban farmer',
      'Provide land registration details, Survey/Khata number, and bank IFSC',
      'Complete mandatory e-KYC via Aadhaar OTP or biometric at nearest CSC centre',
    ],
    hindiOverview: 'सभी पात्र किसान परिवारों को प्रति वर्ष ₹6,000 की वित्तीय सहायता सीधे बैंक खाते में (डीबीटी द्वारा ₹2,000 की 3 किस्तों में)।',
    keyBenefits: [
      '100% direct bank transfer without middleman commission',
      'Financial support for high-quality seeds, fertilizers, and modern farm equipment',
    ],
  },
  {
    id: 'scheme-epfo',
    name: 'EPFO — Universal Account Number (UAN)',
    nameHindi: 'कर्मचारी भविष्य निधि संगठन — यूएएन सेवाएं',
    category: 'Social Security',
    tagline: 'Provident Fund, Pension (EPS-95), and Employees Deposit Linked Insurance (EDLI) management for salaried professionals.',
    officialPortal: 'https://unifiedportal-mem.epfindia.gov.in',
    lastVerifiedDate: '2026-10-22',
    eligibility: [
      'Employees working in establishments with 20 or more workers earning up to or above wage ceiling.',
    ],
    requiredDocuments: [
      'UAN (issued by employer)',
      'Aadhaar linked with Mobile for e-KYC',
      'PAN Card and active Bank Account with IFSC',
    ],
    stepsToApply: [
      'Activate UAN on the Member e-Sewa portal',
      'Link Aadhaar, PAN, and Bank Account under Member Profile -> KYC',
      'File online claims for PF advance, illness, home loan repayment, or full withdrawal after resignation',
      'Download e-Passbook anytime via passbook.epfindia.gov.in',
    ],
    hindiOverview: 'वेतनभोगी कर्मचारियों के लिए भविष्य निधि (PF), पेंशन और जीवन बीमा की ऑनलाइन निकासी एवं पासबुक सुविधा।',
    keyBenefits: [
      'Compound interest guaranteed by Central Board of Trustees (approx 8.25% p.a.)',
      'Tax-free returns upon continuous service of 5+ years',
      'Seamless online transfer between jobs using the same lifetime UAN',
    ],
  },
  {
    id: 'scheme-pmjdy',
    name: 'PM Jan Dhan Yojana (PMJDY)',
    nameHindi: 'प्रधानमंत्री जन धन योजना — वित्तीय समावेशन',
    category: 'Financial Inclusion',
    tagline: 'Zero-balance basic savings bank account with free RuPay debit card and ₹2 Lakh inbuilt accident insurance.',
    officialPortal: 'https://pmjdy.gov.in',
    lastVerifiedDate: '2026-10-10',
    eligibility: [
      'Any Indian citizen aged 10 years and above who does not have any bank account.',
    ],
    requiredDocuments: [
      'Aadhaar Card or Voter ID / Driving License / MNREGA Job Card',
    ],
    stepsToApply: [
      'Visit any commercial bank branch or Bank Mitra / Business Correspondent kiosk',
      'Fill the simple PMJDY account opening form',
      'Provide biometric Aadhaar authentication',
      'Receive instant Zero-Balance Passbook and contactless RuPay card',
    ],
    hindiOverview: 'शून्य शेष बैंक खाता, मुफ्त रुपे डेबिट कार्ड, 2 लाख रुपये का दुर्घटना बीमा और 10,000 रुपये तक की ओवरड्राफ्ट सुविधा।',
    keyBenefits: [
      'Zero minimum balance requirement',
      '₹10,000 overdraft facility for eligible households after 6 months of satisfactory operation',
      'Direct receipt of all government subsidies (LPG, scholarships, pensions)',
    ],
  },
];

export const LEARNING_TOPICS: LearningTopic[] = [
  {
    id: 'topic-constitution',
    subject: 'Indian Polity & Governance',
    title: 'Fundamental Rights & Judicial Writs',
    titleHindi: 'मौलिक अधिकार एवं न्यायिक याचिकाएं (अनुच्छेद 14-32)',
    description: 'Master Articles 12 to 35, basic structure doctrine, habeas corpus, mandamus, certiorari, prohibition, and quo-warranto.',
    difficulty: 'Intermediate',
    sampleQuestions: [
      {
        question: 'Which constitutional writ translates to "We Command" and is issued to enforce public duty?',
        options: ['Habeas Corpus', 'Mandamus', 'Certiorari', 'Quo-Warranto'],
        correctIndex: 1,
        explanation: 'Mandamus is a Latin term meaning "We Command". It is issued by the Supreme Court (Art 32) or High Courts (Art 226) to direct a public authority or government officer to perform their legal duty.',
      },
      {
        question: 'Under which landmark verdict was the "Basic Structure Doctrine" established in India?',
        options: ['Golaknath Case (1967)', 'Kesavananda Bharati Case (1973)', 'Minerva Mills Case (1980)', 'Maneka Gandhi Case (1978)'],
        correctIndex: 1,
        explanation: 'In the historic Kesavananda Bharati v. State of Kerala (1973) 13-judge bench ruling, the Supreme Court held that Parliament cannot alter the basic structure of the Constitution.',
      },
    ],
  },
  {
    id: 'topic-upi',
    subject: 'Technology & Economy',
    title: 'UPI & Indian Digital Public Infrastructure',
    titleHindi: 'यूपीआई और डिजिटल पब्लिक इंफ्रास्ट्रक्चर (इंडिया स्टैक)',
    description: 'Architecture of Unified Payments Interface, NPCI, IMPS rails, 2FA, tokenization, and cross-border UPI integration.',
    difficulty: 'Intermediate',
    sampleQuestions: [
      {
        question: 'Which body designed and operates the Unified Payments Interface (UPI) in India?',
        options: ['Reserve Bank of India (RBI)', 'National Payments Corporation of India (NPCI)', 'NITI Aayog', 'Ministry of Electronics & IT (MeitY)'],
        correctIndex: 1,
        explanation: 'NPCI (National Payments Corporation of India), an umbrella organization founded by RBI and IBA under the Payment and Settlement Systems Act 2007, built and manages UPI.',
      },
      {
        question: 'What foundational technology layer handles single-click 2-factor authentication in UPI?',
        options: ['Aadhaar biometric auth', 'UPI PIN entered securely on Common Library PSP layer', 'SMS OTP only', 'Voice biometric'],
        correctIndex: 1,
        explanation: 'UPI uses a standardized Common Library (CL) provided by NPCI where users enter their secure 4 or 6-digit MPIN directly onto an encrypted banking layer.',
      },
    ],
  },
  {
    id: 'topic-ml',
    subject: 'Artificial Intelligence & Computer Science',
    title: 'Large Language Models & Transformers',
    titleHindi: 'लार्ज लैंग्वेज मॉडल और ट्रांसफार्मर आर्किटेक्चर',
    description: 'Self-attention mechanism, positional encoding, tokens, fine-tuning, embeddings, and real-time inference.',
    difficulty: 'Advanced',
    sampleQuestions: [
      {
        question: 'What was the foundational paper published by Google researchers that introduced the Transformer architecture?',
        options: ['Deep Residual Learning', 'Attention Is All You Need (2017)', 'BERT: Pre-training of Deep Bidirectional Transformers', 'Mastering the Game of Go'],
        correctIndex: 1,
        explanation: 'Vaswani et al. published "Attention Is All You Need" in 2017, replacing recurrent neural networks (RNNs) with multi-head self-attention mechanisms.',
      },
      {
        question: 'What is the purpose of Positional Encoding in Transformer models?',
        options: ['To compress output size', 'To supply sequence order information since attention is permutation-invariant', 'To reduce GPU memory usage', 'To encrypt sensitive prompt data'],
        correctIndex: 1,
        explanation: 'Because multi-head attention processes all tokens in parallel without inherent sequential ordering, positional encodings are added to token embeddings to convey word order.',
      },
    ],
  },
];

export const PRICING_PLANS = [
  {
    id: 'free',
    name: 'Bharat Free',
    priceINR: 0,
    billingPeriod: 'Forever Free',
    badge: 'Every Citizen',
    description: 'Essential everyday AI assistance for personal tasks, daily organization, and government guidance.',
    features: [
      '50 AI Messages per day in English, Hindi & Hinglish',
      'Basic Voice Assistant with speech commands',
      'Smart Daily Planner with up to 25 active tasks',
      'Personal Rupee Expense Tracker (30 transactions/mo)',
      'Verified Bharat Government Services directory',
      'Up to 3 Document analyses per month (PDF/Images)',
      'Cross-device sync with Bharat AI Android App',
    ],
    ctaText: 'Get Started Free',
    popular: false,
  },
  {
    id: 'pro',
    name: 'Bharat Pro',
    priceINR: 299,
    originalPriceINR: 599,
    billingPeriod: 'per month (billed annually at ₹2,999/yr)',
    badge: 'Most Popular across India',
    description: 'Uncapped power for working professionals, students, researchers, and creators.',
    features: [
      'Unlimited high-speed conversational AI with Gemini 3.8 Flash',
      'Unlimited Voice Assistant with native Indian accents & fast audio responses',
      'Full Document Studio: unlimited OCR, translation, contract entity extraction',
      'AI Smart Daily Planner with automated morning briefings & schedule optimizer',
      'Comprehensive Personal Finance: unlimited transactions, budget alerts, and export',
      'AI Learning Hub: unlimited custom study guides, notes & mock exam tests',
      'Priority Cloud Sync with Android companion app',
      'Private Encrypted Cloud Vault for all family documents',
    ],
    ctaText: 'Upgrade to Bharat Pro',
    popular: true,
  },
  {
    id: 'business',
    name: 'Bharat Business & Teams',
    priceINR: 999,
    originalPriceINR: 1999,
    billingPeriod: 'per user / month',
    badge: 'For MSMEs & Teams',
    description: 'Enterprise-grade intelligence for Indian businesses, startups, and institutions.',
    features: [
      'Everything in Bharat Pro plus:',
      'Team workspaces & shared document vaults',
      'Automated GST invoice & vendor bill reconciliation',
      'Role-based access control (Admin, Member, Auditor)',
      'Shared team task boards & project milestones',
      'Dedicated compliance & export reports (CSV, Excel, PDF)',
      'Priority 24/7 WhatsApp & Phone support from Bangalore/Delhi team',
      '99.95% Enterprise SLA uptime guarantee',
    ],
    ctaText: 'Contact Enterprise Sales',
    popular: false,
  },
];

export const FAQS = [
  {
    question: 'What is Bharat AI and how does it help Indian users?',
    answer: 'Bharat AI is India\'s unified, everyday artificial intelligence platform. Rather than using multiple disconnected apps, Bharat AI brings together chat, voice assistant, document intelligence, a smart daily planner, rupee personal finance, official Bharat government schemes, and educational tutors into one seamless, multilingual experience.',
  },
  {
    question: 'Can I speak or chat with Bharat AI in Hindi and Hinglish?',
    answer: 'Yes! Bharat AI is built natively for India and fluently understands and responds in clean Hindi (हिन्दी), contemporary Hinglish (the everyday blend of Hindi and English), and articulate English. You can switch your preferred language at any time in the navbar or prompt the assistant in your natural voice.',
  },
  {
    question: 'How does synchronization with the Bharat AI Android application work?',
    answer: 'Bharat AI uses a shared backend and real-time cloud sync engine. When you create a task, log an expense, or analyze a document on this website, it instantly syncs with your Bharat AI Android smartphone companion app and vice-versa. You can monitor the real-time sync pill in the header.',
  },
  {
    question: 'Are the Bharat Government Services verified and safe?',
    answer: 'Yes. All scheme information in Bharat Services references verified official Government of India (.gov.in / .nic.in) records. We display direct verified portal links, eligibility requirements, and document checklists. Bharat AI does not impersonate government officials and strictly cautions users to never share OTPs or confidential banking PINs.',
  },
  {
    question: 'Is my personal financial and document data private and secure?',
    answer: 'Absolutely. Bharat AI adheres to strict data privacy principles inspired by the Digital Personal Data Protection (DPDP) Act. Your documents, expenses, and chats are encrypted, never sold to third parties, and you can export or permanently delete your complete account data at any time from Settings.',
  },
  {
    question: 'Do I need a credit card to use Bharat AI?',
    answer: 'No! Bharat Free is completely free without requiring any payment method or credit card. When upgrading to Bharat Pro or Business, we support all familiar Indian payment methods including UPI (Google Pay, PhonePe, Paytm, BHIM), RuPay cards, Visa/Mastercard, and Net Banking.',
  },
];

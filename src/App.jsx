import { useState, useEffect } from 'react';

const RACES = ["White","Black","Hispanic","Asian","Indigenous","Multiracial / Other"];
const GENDERS = ["Man","Woman","Non-binary / Gender non-conforming"];
const SOCIO = ["Low income","Working class","Middle class","Upper middle class"];
const REGIONS = ["Urban (major city)","Suburban","Small city / town","Rural"];
const CATEGORIES = [
  {id:"education",label:"Education",icon:"🎓"},
  {id:"career",label:"Career",icon:"💼"},
  {id:"relationships",label:"Relationships",icon:"❤️"},
  {id:"lifestyle",label:"Lifestyle",icon:"🌆"},
];
const OUTCOME_TYPES = [
  {id:"financial",label:"Financial",icon:"💰",color:"#3b82f6"},
  {id:"health",label:"Health",icon:"🏥",color:"#22c55e"},
  {id:"relationship",label:"Family",icon:"💞",color:"#ec4899"},
  {id:"legal",label:"Legal",icon:"⚖️",color:"#f59e0b"},
];
const C = {bg:"#0c0f1a",card:"#161923",border:"#242838",text:"#e2e8f0",muted:"#64748b",accent:"#4f46e5",accentLight:"#818cf8"};
const LEGEND = [["🟢","Chill","#22c55e"],["🟡","Risky","#f59e0b"],["🟠","Seriously Risky","#f97316"],["🔴","High Stakes","#ef4444"]];

const SHADOW_PROFILES = [
  {
    name:"Aisha", age:18, emoji:"👩🏾",
    race:"Black", gender:"Woman", socio:"Low income", region:"Urban (major city)",
    city:"Chicago, IL", decision:"Drop out of high school to work full time",
    context:"Her family needs income now. She's considering leaving school to take a full-time retail job paying $14/hr.",
    bestCase:{
      label:"She gets her GED + enrolls in community college",
      outcomes:[
        {icon:"💰",text:"Earns $42K by age 25 with an associate degree — 55% more than staying in retail"},
        {icon:"🏥",text:"Qualifies for employer health insurance through a healthcare admin job"},
        {icon:"💞",text:"Builds stable foundation — financial stress reduced, relationship health improves"},
        {icon:"⚖️",text:"Clean record, growing professional network, upward mobility trajectory"},
      ],
      stat:"Black women with associate degrees earn 61% more over their lifetime than those without",
    },
    worstCase:{
      label:"She stays in retail with no credential",
      outcomes:[
        {icon:"💰",text:"Still earning $15–17/hr at 25 with no clear path upward — below living wage in Chicago"},
        {icon:"🏥",text:"72% chance of being uninsured — one medical emergency away from serious debt"},
        {icon:"💞",text:"Financial instability is the #1 stressor in relationships — higher separation rates"},
        {icon:"⚖️",text:"Economic precarity increases risk of legal system contact for minor offenses"},
      ],
      stat:"High school dropouts earn $400K less over their lifetime — the gap widens every year",
    },
  },
  {
    name:"Carlos", age:19, emoji:"👨🏽",
    race:"Hispanic", gender:"Man", socio:"Working class", region:"Suburban",
    city:"San Antonio, TX", decision:"Start a business instead of going to college",
    context:"He has a landscaping side hustle making $800/month. He wants to go full-time and skip college entirely.",
    bestCase:{
      label:"He formalizes the business + takes free SBA mentorship",
      outcomes:[
        {icon:"💰",text:"Grows to $65K revenue by 25 with 2 employees — matches college-grad median earnings"},
        {icon:"🏥",text:"Joins a business owners' health co-op — gets coverage for ~$180/month"},
        {icon:"💞",text:"Business ownership creates pride and stability — relationship satisfaction high"},
        {icon:"⚖️",text:"LLC structure protects personal assets — tax records kept clean from day one"},
      ],
      stat:"Hispanic-owned businesses are among the fastest growing in the US — the market is there",
    },
    worstCase:{
      label:"He runs it informally with no structure or plan",
      outcomes:[
        {icon:"💰",text:"Business fails within 3 years (82% do without a plan) — back to square one with no degree"},
        {icon:"🏥",text:"Uninsured for 4+ years — average cost of a single ER visit: $2,200"},
        {icon:"💞",text:"62% of founders report severe relationship strain in years 1–3 without support systems"},
        {icon:"⚖️",text:"IRS penalties for unreported self-employment income average $1,200 — easy to avoid, common to miss"},
      ],
      stat:"80% of businesses that fail cite lack of planning and capital as the primary cause",
    },
  },
  {
    name:"Madison", age:20, emoji:"👩🏼",
    race:"White", gender:"Woman", socio:"Middle class", region:"Rural",
    city:"Rural Kentucky", decision:"Get married at 20 and start a family",
    context:"She's been with her partner for 2 years. They're talking about skipping college and starting their life together now.",
    bestCase:{
      label:"They take pre-marital counseling + build financial foundation first",
      outcomes:[
        {icon:"💰",text:"Both working by 22 with clear budget — household income $68K, on track for home ownership by 27"},
        {icon:"🏥",text:"Stable marriage is one of the strongest predictors of long-term physical and mental health"},
        {icon:"💞",text:"Couples with shared financial goals have 40% lower conflict and divorce rates"},
        {icon:"⚖️",text:"Low legal risk — wills and basic legal documents set up early protect both partners"},
      ],
      stat:"Couples who complete pre-marital education report 30% higher relationship satisfaction",
    },
    worstCase:{
      label:"They marry quickly without financial or communication foundation",
      outcomes:[
        {icon:"💰",text:"45% of under-25 marriages in rural areas end in divorce — average cost: $15,000"},
        {icon:"🏥",text:"Unhappy marriage is clinically worse for mental health than being single — depression rates double"},
        {icon:"💞",text:"First child within year 1 + financial stress = top predictor of early separation"},
        {icon:"⚖️",text:"Custody and asset division in rural areas often requires expensive legal help with limited access"},
      ],
      stat:"Women who divorce before 25 take an average of 5 years to financially recover",
    },
  },
  {
    name:"James", age:18, emoji:"👨🏽‍🦱",
    race:"Indigenous", gender:"Man", socio:"Low income", region:"Rural",
    city:"Rural Montana", decision:"Enlist in the Army after high school",
    context:"Few jobs exist near home. He sees the military as a way out and a path to stability.",
    bestCase:{
      label:"He enlists, uses the GI Bill, and plans his exit from day one",
      outcomes:[
        {icon:"💰",text:"$38K salary + free housing + healthcare on day one. GI Bill covers 4-year degree after service"},
        {icon:"🏥",text:"Full VA healthcare for life — one of the strongest benefits available to any American"},
        {icon:"💞",text:"Military community provides structure and belonging — strong transition support if used"},
        {icon:"⚖️",text:"SCRA protections freeze debt interest during service — powerful financial safeguard"},
      ],
      stat:"Veterans who use the GI Bill have 40% higher lifetime earnings than non-college peers",
    },
    worstCase:{
      label:"He enlists without support awareness and struggles with transition",
      outcomes:[
        {icon:"💰",text:"Veterans without a degree plan post-service often return to low-wage work — GI Bill unused by 40%"},
        {icon:"🏥",text:"PTSD affects 20% of combat veterans — Indigenous veterans are least likely to seek VA mental health care"},
        {icon:"💞",text:"Military divorce rate 15% higher than civilian — deployment + isolation strains family ties"},
        {icon:"⚖️",text:"Indigenous veterans face disproportionate barriers accessing VA benefits — advocacy is essential"},
      ],
      stat:"Indigenous veterans are the most decorated per capita — and the most underserved by VA systems",
    },
  },
  {
    name:"Priya", age:21, emoji:"👩🏽",
    race:"Asian", gender:"Woman", socio:"Upper middle class", region:"Urban (major city)",
    city:"New York, NY", decision:"Take a gap year before starting her career",
    context:"She just graduated college. Has a job offer but feels burned out and unsure.",
    bestCase:{
      label:"She defers the job offer + does a structured gap program",
      outcomes:[
        {icon:"💰",text:"Returns to the job offer refreshed — studies show gap year grads earn 8% more within 5 years"},
        {icon:"🏥",text:"88% of gap year alumni report significantly improved mental health and sense of purpose"},
        {icon:"💞",text:"Self-awareness gained leads to healthier relationships — she knows what she actually wants"},
        {icon:"⚖️",text:"No legal risk — AmeriCorps and structured programs provide visa and legal support abroad"},
      ],
      stat:"90% of employers view gap year experience favorably — it's a differentiator, not a gap",
    },
    worstCase:{
      label:"She quits without a plan and drifts for a year",
      outcomes:[
        {icon:"💰",text:"Loses the job offer — re-entering the NYC job market takes 8–14 months on average"},
        {icon:"🏥",text:"Unstructured time without purpose can worsen anxiety — isolation risk is real"},
        {icon:"💞",text:"Financial dependence on family strains those relationships — guilt and pressure build"},
        {icon:"⚖️",text:"Overstaying visas abroad or working illegally creates immigration complications"},
      ],
      stat:"The difference between a good and bad gap year is almost entirely about structure and intention",
    },
  },
  {
    name:"Jordan", age:19, emoji:"🧑🏽",
    race:"Multiracial / Other", gender:"Non-binary / Gender non-conforming", socio:"Working class", region:"Small city / town",
    city:"Albuquerque, NM", decision:"Go full-time gig economy instead of pursuing any degree or trade",
    context:"They're making $1,200/month driving for Uber and doing TaskRabbit jobs. It feels like freedom.",
    bestCase:{
      label:"They treat gig work as a launchpad + build a high-skill freelance niche",
      outcomes:[
        {icon:"💰",text:"Develops a specialty (e.g. graphic design, coding) — freelance income reaches $55K by 25"},
        {icon:"🏥",text:"Qualifies for ACA subsidies — gets health coverage for under $100/month"},
        {icon:"💞",text:"Flexibility allows them to be present for community — quality of life high when income is stable"},
        {icon:"⚖️",text:"LLC formation + quarterly tax filing keeps them legally protected and audit-proof"},
      ],
      stat:"Skilled freelancers who specialize earn 3x more than general gig workers within 3 years",
    },
    worstCase:{
      label:"They stay in low-skill gig work with no plan to grow",
      outcomes:[
        {icon:"💰",text:"$32K median annual income — below living wage in most US cities by 2027 due to inflation"},
        {icon:"🏥",text:"78% of non-binary gig workers are uninsured — highest uninsured rate of any demographic"},
        {icon:"💞",text:"Income instability is the #1 predictor of relationship breakdown regardless of gender identity"},
        {icon:"⚖️",text:"Accumulated IRS penalties for unfiled self-employment taxes average $3,400 — very common"},
      ],
      stat:"Non-binary workers face a 32% wage gap vs. cisgender peers — gig work amplifies rather than escapes it",
    },
  },
];

const SCENARIOS = [
  {id:"college",category:"education",icon:"🎓",riskScore:35,title:"4-Year College Degree",tagline:"Traditional university path",
   outcomes:{
     financial:{headline:"+$400K lifetime earnings vs. HS diploma",stat:"Median $1,248/wk vs $853/wk without degree",byRace:{"White":"$1,310/wk","Black":"$1,020/wk","Hispanic":"$1,050/wk","Asian":"$1,480/wk","Indigenous":"$890/wk","Multiracial / Other":"$1,080/wk"},byGender:{"Man":"$1,398/wk","Woman":"$1,066/wk","Non-binary / Gender non-conforming":"~$1,000/wk"}},
     health:{headline:"78% more likely to have employer health coverage",stat:"College grads live ~5 years longer on average",byRace:{"White":"87% insured","Black":"79%","Hispanic":"74%","Asian":"88%","Indigenous":"71%","Multiracial / Other":"78%"},byGender:{"Man":"81%","Woman":"76%","Non-binary / Gender non-conforming":"~68%"}},
     relationship:{headline:"65% marriage rate — 30% lower divorce rate",stat:"Financial stability strongly predicts relationship stability",byRace:{"White":"68% married","Black":"44%","Hispanic":"56%","Asian":"71%","Indigenous":"47%","Multiracial / Other":"55%"},byGender:{"Man":"67%","Woman":"63%","Non-binary / Gender non-conforming":"~42%"}},
     legal:{headline:"4x less likely to be incarcerated vs. non-graduates",stat:"Education is one of the strongest crime-prevention factors",byRace:{"White":"0.5%","Black":"3.1% (college significantly reduces this)","Hispanic":"1.3%","Asian":"0.3%","Indigenous":"1.8%","Multiracial / Other":"1.1%"},byGender:{"Man":"1.4%","Woman":"0.2%","Non-binary / Gender non-conforming":"~0.6%"}},
   },
   beatsOdds:["First-gen graduates match legacy peers in earnings within 10 years","FAFSA can unlock thousands in free grant money — most teens never apply","HBCUs offer strong professional networks and scholarship opportunities"],
   resources:[{emoji:"🎓",label:"Apply for Federal Student Aid (FAFSA)",url:"https://studentaid.gov",desc:"Free money for college — grants, loans & work-study"},{emoji:"🏫",label:"College Scorecard",url:"https://collegescorecard.ed.gov",desc:"Compare colleges by cost, graduation rate & earnings"},{emoji:"💰",label:"Fastweb Scholarship Finder",url:"https://www.fastweb.com",desc:"Find scholarships that match your background"},{emoji:"🗺️",label:"BigFuture by College Board",url:"https://bigfuture.collegeboard.org",desc:"Plan your path to college step by step"}],
   sources:["BLS 2023","Pew Research 2022","CDC","NCES"],
  },
  {id:"community_college",category:"education",icon:"📚",riskScore:22,title:"Community College",tagline:"2-year degree or transfer pathway",
   outcomes:{
     financial:{headline:"Avg $84K less debt than 4-year university",stat:"Associate degree earners avg $963/wk",byRace:{"White":"$990/wk","Black":"$870/wk","Hispanic":"$850/wk","Asian":"$1,010/wk","Indigenous":"$810/wk","Multiracial / Other":"$900/wk"},byGender:{"Man":"$1,020/wk","Woman":"$890/wk","Non-binary / Gender non-conforming":"~$840/wk"}},
     health:{headline:"65% have employer health coverage after graduation",stat:"Lower debt burden improves mental health outcomes",byRace:{"White":"70%","Black":"60%","Hispanic":"57%","Asian":"68%","Indigenous":"54%","Multiracial / Other":"62%"},byGender:{"Man":"67%","Woman":"63%","Non-binary / Gender non-conforming":"~58%"}},
     relationship:{headline:"More flexibility for family and community ties",stat:"Students more likely to stay near support networks",byRace:{"All groups":"Similar positive outcomes"},byGender:{"All groups":"Similar"}},
     legal:{headline:"Very low legal risk pathway",stat:"Accessible regardless of prior academic record",byRace:{"All groups":"Low risk"},byGender:{"All groups":"Very low"}},
   },
   beatsOdds:["Many 4-year universities have guaranteed transfer agreements with community colleges","Nursing, IT, and trades at CC offer 6-figure career paths","Zero-debt graduation is realistic with Pell Grants and part-time work"],
   resources:[{emoji:"🏫",label:"Find a Community College Near You",url:"https://www.aacc.nche.edu/college-finder",desc:"American Association of Community Colleges directory"},{emoji:"💵",label:"Apply for FAFSA",url:"https://studentaid.gov",desc:"Most CC students qualify for free Pell Grant money"},{emoji:"🔄",label:"Transferology",url:"https://transferology.com",desc:"See how your credits transfer to 4-year schools"},{emoji:"📋",label:"CareerOneStop",url:"https://www.careeronestop.org",desc:"Explore careers and training programs near you"}],
   sources:["AACC 2023","BLS","College Board"],
  },
  {id:"gap_year",category:"education",icon:"🌍",riskScore:38,title:"Take a Gap Year",tagline:"Pause to travel, volunteer, or find direction",
   outcomes:{
     financial:{headline:"Gap year students earn 5–8% more post-graduation",stat:"BUT: delaying entry costs ~$50K in foregone earnings per year",byRace:{"All groups":"Similar — structured programs matter most"},byGender:{"Man":"Slightly higher post-gap earnings","Woman":"Similar","Non-binary / Gender non-conforming":"Variable"}},
     health:{headline:"88% report improved mental clarity and readiness",stat:"Reduced burnout + higher college completion rates",byRace:{"All groups":"Similar"},byGender:{"All groups":"Similar"}},
     relationship:{headline:"Strong positive effect on self-awareness and maturity",stat:"Gap year students report higher life satisfaction at 30",byRace:{"All groups":"Similar"},byGender:{"All groups":"Similar"}},
     legal:{headline:"Very low legal risk",stat:"Visa requirements vary significantly by destination",byRace:{"All groups":"Similar"},byGender:{"Woman":"Safety planning important","Man":"Lower risk","Non-binary / Gender non-conforming":"Research destination protections"}},
   },
   beatsOdds:["AmeriCorps gives you a stipend AND college award money","90% of employers view gap year experience positively","Lock in your college deferral before you go"],
   resources:[{emoji:"🇺🇸",label:"AmeriCorps",url:"https://americorps.gov",desc:"Earn a living stipend + $7,395 education award"},{emoji:"✈️",label:"American Gap Association",url:"https://www.americangap.org",desc:"Find accredited, safe gap year programs"},{emoji:"🌐",label:"Peace Corps",url:"https://www.peacecorps.gov",desc:"2-year international service with full benefits"},{emoji:"📅",label:"Gap Year Association",url:"https://www.gapyearassociation.org",desc:"Resources & how to defer your college acceptance"}],
   sources:["American Gap Association 2022","Harvard Bridge Year Data"],
  },
  {id:"dropout",category:"education",icon:"📉",riskScore:72,title:"No Degree / Drop Out",tagline:"Leaving school without a degree or certification",
   outcomes:{
     financial:{headline:"$853/wk median — $395 less than college grads weekly",stat:"Unemployment rate 5.5% vs 2.2% for college grads",byRace:{"White":"$918/wk","Black":"$759/wk","Hispanic":"$761/wk","Asian":"$892/wk","Indigenous":"$701/wk","Multiracial / Other":"$780/wk"},byGender:{"Man":"$926/wk","Woman":"$781/wk","Non-binary / Gender non-conforming":"~$720/wk"}},
     health:{headline:"3x more likely to be uninsured",stat:"Life expectancy 5+ years shorter than degree holders",byRace:{"White":"18% uninsured","Black":"24%","Hispanic":"35%","Asian":"14%","Indigenous":"29%","Multiracial / Other":"25%"},byGender:{"Man":"22%","Woman":"18%","Non-binary / Gender non-conforming":"~31%"}},
     relationship:{headline:"50%+ higher divorce & separation rate",stat:"Financial stress is the #1 cited cause of breakups",byRace:{"White":"48%","Black":"55%","Hispanic":"45%","Asian":"38%","Indigenous":"52%","Multiracial / Other":"47%"},byGender:{"Man":"51%","Woman":"49%","Non-binary / Gender non-conforming":"~57%"}},
     legal:{headline:"3.5x more likely to be arrested vs. degree holders",stat:"Economic precarity strongly correlates with legal system contact",byRace:{"White":"Moderate","Black":"Very high elevation","Hispanic":"High elevation","Asian":"Low","Indigenous":"Very high","Multiracial / Other":"Moderate-high"},byGender:{"Man":"High risk","Woman":"Moderate","Non-binary / Gender non-conforming":"Moderate-high"}},
   },
   beatsOdds:["A GED opens doors to community college and most jobs","Trade certifications can fully replace a degree in many fields","Adult education programs are free in most states"],
   resources:[{emoji:"📝",label:"Get Your GED",url:"https://ged.com",desc:"Official GED testing — prep resources included"},{emoji:"🏫",label:"Find Adult Education Classes",url:"https://lincs.ed.gov/resource-library/adult-education",desc:"Free adult education programs near you"},{emoji:"🔧",label:"Find Trade School Programs",url:"https://www.careeronestop.org/toolkit/training/find-certifications.aspx",desc:"Search trade & certification programs by location"},{emoji:"💼",label:"Job Corps",url:"https://www.jobcorps.gov",desc:"Free education & job training for ages 16–24"}],
   sources:["BLS 2023","Census Bureau","NCES"],
  },
  {id:"trade",category:"education",icon:"🔧",riskScore:28,title:"Trade / Vocational School",tagline:"Skilled trades, tech certs, coding bootcamps",
   outcomes:{
     financial:{headline:"$60K+ starting salary in top trades",stat:"Electricians $61K · Plumbers $59K · HVAC $51K",byRace:{"White":"$58K avg","Black":"$51K avg","Hispanic":"$49K avg","Asian":"$60K avg","Indigenous":"$47K avg","Multiracial / Other":"$52K avg"},byGender:{"Man":"$62K avg","Woman":"$44K avg (field is changing)","Non-binary / Gender non-conforming":"$46K avg"}},
     health:{headline:"55% have employer health coverage; union trades 78%",stat:"Physical demands — injury rates vary by trade",byRace:{"White":"61%","Black":"52%","Hispanic":"47%","Asian":"58%","Indigenous":"45%","Multiracial / Other":"50%"},byGender:{"Man":"58%","Woman":"49%","Non-binary / Gender non-conforming":"~44%"}},
     relationship:{headline:"58% marriage rate — stable employment helps",stat:"Similar to general population average",byRace:{"White":"62%","Black":"41%","Hispanic":"54%","Asian":"63%","Indigenous":"44%","Multiracial / Other":"52%"},byGender:{"Man":"61%","Woman":"53%","Non-binary / Gender non-conforming":"~40%"}},
     legal:{headline:"Low legal risk — licensed & regulated profession",stat:"Licensing creates accountability and protection",byRace:{"All groups":"Low"},byGender:{"All groups":"Very low"}},
   },
   beatsOdds:["Apprenticeships let you earn while you learn — no tuition debt","Union membership closes the racial wage gap in trades","Women in union trades earn within 90% of male counterparts"],
   resources:[{emoji:"🛠️",label:"Apprenticeship.gov",url:"https://www.apprenticeship.gov",desc:"Find paid apprenticeships in your trade"},{emoji:"⚡",label:"Trade School Finder",url:"https://www.careeronestop.org/toolkit/training/find-certifications.aspx",desc:"Search accredited trade programs near you"},{emoji:"👷",label:"Job Corps",url:"https://www.jobcorps.gov",desc:"Free trade training for 16–24 year olds"},{emoji:"🔗",label:"NABTU — Union Apprenticeships",url:"https://nabtu.org",desc:"Find union apprenticeship programs in your area"}],
   sources:["BLS 2023","DOL","NABTU"],
  },
  {id:"military",category:"career",icon:"🎖️",riskScore:45,title:"Military / Armed Forces",tagline:"Enlisting or commissioning into military service",
   outcomes:{
     financial:{headline:"Free housing, healthcare + $25K–$50K starting pay",stat:"GI Bill covers 4-year tuition + $2,200/month housing",byRace:{"White":"Full benefits","Black":"Underrepresented in officer ranks","Hispanic":"Fastest-growing enlisted demographic","Asian":"High in technical roles","Indigenous":"Highest per-capita enlistment rate","Multiracial / Other":"Full benefits"},byGender:{"Man":"Full combat roles","Woman":"All roles open since 2016","Non-binary / Gender non-conforming":"Policy evolving"}},
     health:{headline:"Full healthcare for service members and families",stat:"PTSD affects 11–20% of combat veterans",byRace:{"All groups":"Similar access; PTSD treatment gap affects all"},byGender:{"Man":"Higher combat exposure","Woman":"Higher rates of military sexual trauma","Non-binary / Gender non-conforming":"Elevated mental health risk"}},
     relationship:{headline:"Divorce rate 15% higher than civilian average",stat:"Deployment + relocation strains families",byRace:{"All groups":"Similar impact"},byGender:{"Man":"Partner bears home burden","Woman":"Higher divorce rate than male service members","Non-binary / Gender non-conforming":"Additional identity stressors"}},
     legal:{headline:"UCMJ governs conduct; veterans get strong protections",stat:"SCRA protects finances during active duty",byRace:{"Black & Hispanic":"Disproportionately subject to military justice"},byGender:{"Man":"Standard","Woman":"MST legal protections improving","Non-binary / Gender non-conforming":"Evolving protections"}},
   },
   beatsOdds:["GI Bill is one of the most powerful wealth-building tools for young Americans","Veterans have the lowest unemployment rate of any demographic","Military opens doors to federal careers and leadership roles"],
   resources:[{emoji:"🎓",label:"GI Bill Benefits",url:"https://www.benefits.va.gov/gibill",desc:"Free college + monthly housing stipend for veterans"},{emoji:"🪖",label:"GoArmy",url:"https://www.goarmy.com",desc:"Benefits, bonuses & career paths in the Army"},{emoji:"🧠",label:"Military OneSource",url:"https://www.militaryonesource.mil",desc:"Mental health & family support for service members"},{emoji:"⚖️",label:"SCRA Financial Protections",url:"https://www.militaryconsumer.gov",desc:"Know your legal protections on active duty"}],
   sources:["DoD 2023","VA Benefits Data","RAND"],
  },
  {id:"entrepreneur",category:"career",icon:"🚀",riskScore:62,title:"Start a Business",tagline:"Launch your own business or startup",
   outcomes:{
     financial:{headline:"Only 20% of businesses survive past 5 years",stat:"Median founder income lower than employment in years 1–3",byRace:{"White":"21% 5-yr survival","Black":"16% (capital access is key barrier)","Hispanic":"18%","Asian":"22%","Indigenous":"14%","Multiracial / Other":"17%"},byGender:{"Man":"21%","Woman":"19% (growing fastest)","Non-binary / Gender non-conforming":"~17%"}},
     health:{headline:"High stress — but high purpose and autonomy",stat:"72% report work-life imbalance in first 3 years",byRace:{"All groups":"Similar stress — capital access differs"},byGender:{"Man":"High stress","Woman":"Very high","Non-binary / Gender non-conforming":"Very high"}},
     relationship:{headline:"62% report relationships strained in first 3 years",stat:"Long hours + financial uncertainty = top stressors",byRace:{"All groups":"Similar"},byGender:{"Man":"64%","Woman":"60%","Non-binary / Gender non-conforming":"~61%"}},
     legal:{headline:"Moderate legal exposure — contracts, taxes, liability",stat:"LLC/Corp structure reduces personal legal risk",byRace:{"All groups":"Similar; legal resource access varies"},byGender:{"All groups":"Similar"}},
   },
   beatsOdds:["Black-owned businesses are the fastest growing in the US","SBA loans and minority grants have huge unused capacity","SCORE offers free mentorship from experienced owners"],
   resources:[{emoji:"💼",label:"SBA — Small Business Administration",url:"https://www.sba.gov",desc:"Loans, grants & free business counseling"},{emoji:"🧑‍🏫",label:"SCORE Free Mentorship",url:"https://www.score.org",desc:"Free mentoring from experienced business owners"},{emoji:"🌍",label:"Minority Business Development Agency",url:"https://www.mbda.gov",desc:"Grants & resources for minority-owned businesses"},{emoji:"📋",label:"IRS Starting a Business Guide",url:"https://www.irs.gov/businesses/small-businesses-self-employed/starting-a-business",desc:"Tax basics every new business owner needs"}],
   sources:["SBA 2023","Kauffman Foundation"],
  },
  {id:"gig",category:"career",icon:"📱",riskScore:55,title:"Gig Economy Full-Time",tagline:"Uber, DoorDash, Fiverr, freelancing as primary income",
   outcomes:{
     financial:{headline:"$38K median annual income — zero employer benefits",stat:"Income varies 40%+ month to month",byRace:{"White":"$41K","Black":"$34K","Hispanic":"$32K","Asian":"$43K","Indigenous":"$30K","Multiracial / Other":"$35K"},byGender:{"Man":"$41K","Woman":"$35K","Non-binary / Gender non-conforming":"~$33K"}},
     health:{headline:"72% of full-time gig workers lack health insurance",stat:"ACA plans avg $500+/month without employer subsidy",byRace:{"White":"65% uninsured","Black":"78%","Hispanic":"82%","Asian":"61%","Indigenous":"85%","Multiracial / Other":"75%"},byGender:{"Man":"74%","Woman":"70%","Non-binary / Gender non-conforming":"~78%"}},
     relationship:{headline:"Flexibility helps — income instability hurts",stat:"Financial unpredictability is a top relationship stressor",byRace:{"All groups":"Similar"},byGender:{"All groups":"Similar"}},
     legal:{headline:"Tax misclassification and non-filing are common traps",stat:"IRS audits self-employed at higher rates",byRace:{"All groups":"Similar"},byGender:{"All groups":"Similar"}},
   },
   beatsOdds:["High-skill freelancers regularly earn $80–150K+","Gig work + upskilling is a proven path to full employment","ACA subsidies may make health coverage affordable"],
   resources:[{emoji:"🏥",label:"HealthCare.gov — ACA Marketplace",url:"https://www.healthcare.gov",desc:"Find affordable health insurance as a self-employed worker"},{emoji:"🤝",label:"Freelancers Union",url:"https://www.freelancersunion.org",desc:"Benefits, advocacy & community for independent workers"},{emoji:"🧾",label:"IRS Self-Employed Tax Guide",url:"https://www.irs.gov/businesses/small-businesses-self-employed/self-employed-individuals-tax-center",desc:"Understand quarterly taxes before the IRS comes knocking"},{emoji:"📈",label:"Upwork",url:"https://www.upwork.com",desc:"Find higher-paying freelance work to grow your income"}],
   sources:["McKinsey 2022","Freelancers Union 2023"],
  },
  {id:"cohabitation",category:"relationships",icon:"🏠",riskScore:30,title:"Living Together Before Marriage",tagline:"Moving in with a partner before getting married",
   outcomes:{
     financial:{headline:"Avg $15K–$20K saved per year sharing living costs",stat:"Financial compatibility easier to assess before committing",byRace:{"All groups":"Similar"},byGender:{"All groups":"Similar"}},
     health:{headline:"Companionship benefits mental health when healthy",stat:"Unhealthy dynamics become harder to exit",byRace:{"All groups":"Similar"},byGender:{"Woman":"Higher DV risk if unhealthy","Man":"Mental health benefit from stable partnership","Non-binary / Gender non-conforming":"Elevated risk if partner is unsupportive"}},
     relationship:{headline:"Intentional cohabitation = 12% more likely to stay together",stat:"'Sliding not deciding' raises divorce risk by 19%",byRace:{"All groups":"Similar; cultural attitudes vary"},byGender:{"All groups":"Intention is the key factor"}},
     legal:{headline:"No automatic legal protections without marriage",stat:"Common-law marriage only in 8 states",byRace:{"All groups":"Same legal status"},byGender:{"Woman":"More vulnerable without legal protection","Man":"Less exposure","Non-binary / Gender non-conforming":"Limited recognition in many states"}},
   },
   beatsOdds:["Discussing finances before moving in cuts conflict by 40%","Cohabitation agreements protect both partners","Intentional timelines dramatically improve outcomes"],
   resources:[{emoji:"❤️",label:"Relate — Relationship Counseling",url:"https://www.relate.org.uk",desc:"Affordable couples counseling & communication tools"},{emoji:"💵",label:"Consumer.gov — Managing Money Together",url:"https://consumer.gov/managing-your-money",desc:"Free financial planning basics for couples"},{emoji:"⚖️",label:"LawHelp — Tenant Rights",url:"https://www.lawhelp.org",desc:"Know your rights if you share a lease and break up"},{emoji:"🧠",label:"Love Is Respect",url:"https://www.loveisrespect.org",desc:"Understand healthy vs. unhealthy relationships"}],
   sources:["Journal of Marriage & Family","Pew 2022","CDC"],
  },
  {id:"early_marriage",category:"relationships",icon:"💍",riskScore:52,title:"Marriage Before Age 25",tagline:"Getting married in your late teens or early twenties",
   outcomes:{
     financial:{headline:"38% higher divorce rate — divorce costs $15K–$30K avg",stat:"Financial recovery after divorce takes 3–5 years",byRace:{"White":"40%","Black":"55%","Hispanic":"45%","Asian":"28%","Indigenous":"50%","Multiracial / Other":"42%"},byGender:{"Man":"Financial liability more common","Woman":"Career interruption more common","Non-binary / Gender non-conforming":"High variability"}},
     health:{headline:"Stable marriage improves health — unstable reverses it",stat:"Unhappy marriage is worse for mental health than being single",byRace:{"All groups":"Similar; socioeconomic stress amplifies"},byGender:{"Man":"Greater benefit from stable marriage","Woman":"Greater harm from unstable","Non-binary / Gender non-conforming":"Similar to women's pattern"}},
     relationship:{headline:"48% of under-25 marriages end in divorce within 10 years",stat:"Identity development continues through mid-20s",byRace:{"White":"45%","Black":"58%","Hispanic":"50%","Asian":"35%","Indigenous":"52%","Multiracial / Other":"48%"},byGender:{"Man":"Lower divorce initiation","Woman":"Initiate 70% of divorces","Non-binary / Gender non-conforming":"High variability"}},
     legal:{headline:"Divorce, custody & assets create legal complexity",stat:"Low risk initially — grows with assets and children",byRace:{"All groups":"Similar; legal aid varies by income"},byGender:{"Man":"More often hit by financial judgments","Woman":"More often affected by custody","Non-binary / Gender non-conforming":"Variable"}},
   },
   beatsOdds:["Pre-marital financial literacy reduces divorce rates by ~30%","Couples who discuss money and values openly succeed at much higher rates","Community and faith networks strongly buffer early marriage risks"],
   resources:[{emoji:"💑",label:"Prepare/Enrich",url:"https://www.prepare-enrich.com",desc:"Research-backed pre-marital counseling program"},{emoji:"💵",label:"NFEC Financial Literacy for Couples",url:"https://www.nfec.org",desc:"Free financial literacy tools and courses"},{emoji:"⚖️",label:"LawHelp — Family Law",url:"https://www.lawhelp.org",desc:"Understand marriage, divorce & custody law in your state"},{emoji:"❤️",label:"Love Is Respect",url:"https://www.loveisrespect.org",desc:"Is your relationship healthy?"}],
   sources:["CDC 2022","Pew","Journal of Family Psychology"],
  },
  {id:"young_parent",category:"relationships",icon:"👶",riskScore:65,title:"Having Children Before 25",tagline:"Becoming a parent in your teens or early twenties",
   outcomes:{
     financial:{headline:"$250K+ cost to raise one child to age 18",stat:"Young parents earn 40% less over lifetime vs. peers",byRace:{"White":"~$300K","Black":"~$220K","Hispanic":"~$210K","Asian":"~$310K","Indigenous":"~$195K","Multiracial / Other":"~$230K"},byGender:{"Man":"Avg 1 yr career interruption","Woman":"Avg 4.5 yr career interruption","Non-binary / Gender non-conforming":"Significant variability"}},
     health:{headline:"2x higher postpartum depression rates for young parents",stat:"Teen mothers face elevated obstetric complications",byRace:{"White":"Baseline","Black":"3x higher maternal mortality — systemic failure","Hispanic":"1.4x baseline","Asian":"Below baseline","Indigenous":"2.3x higher","Multiracial / Other":"1.5x baseline"},byGender:{"Man":"Mental health stress","Woman":"Direct physical health risk","Non-binary / Gender non-conforming":"High risk — often without tailored care"}},
     relationship:{headline:"80% of teen parents no longer together at 5 years",stat:"Co-parenting challenges persist after separation",byRace:{"All groups":"Similar separation rates"},byGender:{"Man":"Higher disengagement rate","Woman":"More often primary caregiver","Non-binary / Gender non-conforming":"Variable"}},
     legal:{headline:"Child support & custody create ongoing legal obligations",stat:"Non-payment can lead to license suspension or incarceration",byRace:{"White":"Similar","Black":"Disproportionately affected","Hispanic":"Moderate elevation","Asian":"Similar","Indigenous":"Disproportionate enforcement","Multiracial / Other":"Similar"},byGender:{"Man":"More often subject to support orders","Woman":"More often recipient","Non-binary / Gender non-conforming":"Variable"}},
   },
   beatsOdds:["Extended family support dramatically improves young parent outcomes","WIC and CHIP provide free food and healthcare","Young parents who complete education match peers' earnings within 15 years"],
   resources:[{emoji:"🍼",label:"WIC — Free Food & Nutrition",url:"https://www.fns.usda.gov/wic",desc:"Free food, formula & nutrition help for young families"},{emoji:"🏥",label:"Medicaid & CHIP",url:"https://www.medicaid.gov/chip/index.html",desc:"Free or low-cost healthcare for children and parents"},{emoji:"🏫",label:"Child Care Assistance",url:"https://childcare.gov",desc:"Find subsidized childcare so you can work or study"},{emoji:"👩‍👧",label:"Power to Decide",url:"https://powertodecide.org",desc:"Resources and support for young parents"}],
   sources:["CDC 2022","Urban Institute","Census Bureau"],
  },
  {id:"substances",category:"lifestyle",icon:"⚠️",riskScore:78,title:"Regular Substance Use",tagline:"Regular use of cannabis, alcohol, or other substances",
   outcomes:{
     financial:{headline:"Up to -$20K/year in wages, healthcare & legal fees",stat:"Heavy users lose avg 14 productive workdays per year",byRace:{"All groups":"Similar financial impact — legal consequences vary sharply"},byGender:{"Man":"Higher overall use rates","Woman":"Faster biological progression to dependence","Non-binary / Gender non-conforming":"Highest risk for substance use disorders"}},
     health:{headline:"7+ year reduction in life expectancy for heavy users",stat:"Cannabis: respiratory & cognitive impacts with daily use",byRace:{"All groups":"Similar outcomes; access to treatment varies"},byGender:{"Man":"Higher overdose mortality","Woman":"Faster liver damage from alcohol","Non-binary / Gender non-conforming":"High mental health comorbidity"}},
     relationship:{headline:"3x higher breakup/divorce rate for substance-dependent people",stat:"Addiction cited in 50% of divorces nationally",byRace:{"All groups":"Similar"},byGender:{"Man":"Partner more often affected","Woman":"Linked to elevated DV risk","Non-binary / Gender non-conforming":"High risk"}},
     legal:{headline:"⚠️ Drug arrests are RACIALLY DISPARATE despite equal usage rates",stat:"Black Americans 3.73x more likely to be arrested for cannabis",byRace:{"White":"Baseline","Black":"3.73x higher (ACLU)","Hispanic":"1.7x higher","Asian":"Below baseline","Indigenous":"2.5x higher","Multiracial / Other":"1.5x higher"},byGender:{"Man":"6x more likely arrested than women","Woman":"Lower but rising","Non-binary / Gender non-conforming":"Elevated and variable"}},
   },
   beatsOdds:["Early intervention before dependence has 80%+ success rate","Recovery programs have 40–60% long-term success","Many states allow expungement of drug records"],
   resources:[{emoji:"📞",label:"SAMHSA Helpline — Free & Confidential",url:"https://www.samhsa.gov/find-help/national-helpline",desc:"Free treatment referrals 24/7 — call 1-800-662-4357"},{emoji:"🔍",label:"FindTreatment.gov",url:"https://findtreatment.gov",desc:"Find nearby addiction treatment programs"},{emoji:"⚖️",label:"Clean Slate — Expungement Help",url:"https://www.cleanslateinitiative.org",desc:"See if you qualify to clear drug charges from your record"},{emoji:"💬",label:"Crisis Text Line",url:"https://www.crisistextline.org",desc:"Text HOME to 741741 — free crisis support anytime"}],
   sources:["ACLU 2023","SAMHSA 2022","NIH"],
  },
  {id:"moving_abroad",category:"lifestyle",icon:"✈️",riskScore:42,title:"Moving Abroad",tagline:"Relocating to another country for work, study, or lifestyle",
   outcomes:{
     financial:{headline:"Salary varies wildly by destination — research is critical",stat:"US expats can exclude ~$120K/yr from US taxes (FEIE)",byRace:{"All groups":"Similar; racism in destination country is a real factor"},byGender:{"Man":"Generally similar","Woman":"Safety and workplace discrimination vary by country","Non-binary / Gender non-conforming":"Research destination's legal protections carefully"}},
     health:{headline:"Some countries offer better free healthcare than the US",stat:"Cultural isolation hits hard in year 1 — plan for it",byRace:{"All groups":"Research destination's racial climate before committing"},byGender:{"All groups":"Women's healthcare varies dramatically by country"}},
     relationship:{headline:"Distance from family & friends is the #1 hardship",stat:"40% of expats return within 3 years due to loneliness",byRace:{"All groups":"Expat community networks are the strongest buffer"},byGender:{"All groups":"Partner buy-in is critical"}},
     legal:{headline:"Visa, tax & residency laws are complex and country-specific",stat:"Overstaying a visa can result in lifetime re-entry bans",byRace:{"All groups":"Similar; border treatment can vary"},byGender:{"All groups":"Similar"}},
   },
   beatsOdds:["Portugal, Germany, and Canada actively recruit American workers","Remote work visas available in 50+ countries — keep your US salary","Expats report the highest life satisfaction after year 2"],
   resources:[{emoji:"🛂",label:"US State Dept — Travel & Visas",url:"https://travel.state.gov",desc:"Official visa info & safety ratings by country"},{emoji:"💰",label:"IRS — Foreign Earned Income Exclusion",url:"https://www.irs.gov/individuals/international-taxpayers/foreign-earned-income-exclusion",desc:"How to legally reduce US taxes while living abroad"},{emoji:"🌐",label:"InterNations — Expat Community",url:"https://www.internations.org",desc:"Connect with expats in 420+ cities worldwide"},{emoji:"🗺️",label:"Nomad List",url:"https://nomadlist.com",desc:"Compare cost of living, safety & internet quality worldwide"}],
   sources:["State Dept","InterNations 2023","IRS"],
  },
  {id:"city_move",category:"lifestyle",icon:"🏙️",riskScore:36,title:"Moving to a Major City",tagline:"Relocating to a large US urban area for opportunity",
   outcomes:{
     financial:{headline:"+$18K avg wage premium in major metros vs. rural",stat:"But NYC/SF/LA cost-of-living can fully negate the gain",byRace:{"White":"Full premium","Black":"+$14K (housing discrimination limits access)","Hispanic":"+$13K","Asian":"+$22K","Indigenous":"+$11K","Multiracial / Other":"+$14K"},byGender:{"Man":"+$19K avg","Woman":"+$16K avg","Non-binary / Gender non-conforming":"+$14K avg"}},
     health:{headline:"Better healthcare access; but higher stress and loneliness",stat:"30% of urban adults report feeling seriously lonely",byRace:{"All groups":"Access improves; neighborhood quality varies"},byGender:{"All groups":"Similar; women report higher urban loneliness"}},
     relationship:{headline:"Larger social pool — harder to build deep community",stat:"Social networks take longer to build in new cities",byRace:{"All groups":"Existing community networks are the strongest buffer"},byGender:{"All groups":"Similar"}},
     legal:{headline:"More legal protections and resources in cities",stat:"Higher legal costs if representation is needed",byRace:{"White":"Lower police contact","Black":"Higher contact in urban areas","Hispanic":"Elevated","Asian":"Lower","Indigenous":"Elevated","Multiracial / Other":"Moderate"},byGender:{"Man":"Higher police contact","Woman":"Higher housing harassment risk","Non-binary / Gender non-conforming":"Elevated bias incident risk"}},
   },
   beatsOdds:["Research COL vs. salary before accepting any offer","Cities with strong minority communities offer powerful networks","Remote work may let you earn city-level wages without city-level rent"],
   resources:[{emoji:"🏙️",label:"NerdWallet Cost of Living Calculator",url:"https://www.nerdwallet.com/cost-of-living-calculator",desc:"Compare your current city to any city in the US"},{emoji:"🏠",label:"Apartments.com",url:"https://www.apartments.com",desc:"Find and compare rentals in any city"},{emoji:"💼",label:"Indeed — Jobs by City",url:"https://www.indeed.com",desc:"See what jobs and salaries are available in your target city"},{emoji:"🤝",label:"Meetup",url:"https://www.meetup.com",desc:"Find people with your interests in any new city"}],
   sources:["Census 2023","Brookings","Harvard Opportunity Atlas"],
  },
];

const ASSESSMENT_QUESTIONS = [
  {id:"decision",label:"What decision are you facing right now?",type:"text",placeholder:"e.g. Should I drop out of college and start working full-time?"},
  {id:"age",label:"How old are you?",type:"select",options:["17 or younger","18–19","20–21","22–24","25–27"]},
  {id:"urgency",label:"How urgent is this decision?",type:"select",options:["This week","Within a month","Within 6 months","Just exploring"]},
  {id:"support",label:"What kind of support do you have?",type:"select",options:["Strong family & community support","Some support","Mostly on my own","No real support network"]},
  {id:"goal",label:"What matters most to you right now?",type:"select",options:["Financial security","Freedom & independence","Family & relationships","Personal growth & purpose","Making an impact"]},
  {id:"fear",label:"What's your biggest fear about this decision?",type:"text",placeholder:"Be honest — this gives you more useful insight"},
];

function getRiskLevel(s) {
  if (s < 35) return ({label:"🟢 Chill", color:"#22c55e", sentence:"Most people who take this path report solid outcomes — challenges exist but are very manageable."});
  if (s < 55) return ({label:"🟡 Risky", color:"#f59e0b", sentence:"This path has real challenges, but most people navigate them successfully with the right preparation."});
  if (s < 70) return ({label:"🟠 Seriously Risky", color:"#f97316", sentence:"Serious challenges affect most people who choose this — going in prepared makes a huge difference."});
  return ({label:"🔴 High Stakes", color:"#ef4444", sentence:"Most people who go this route face major setbacks. Knowing the risks upfront is your biggest advantage."});
}

function RiskLegend({compact=false}) {
  return (
    <div style={{display:"flex",gap:6,flexWrap:"wrap",padding:compact?"8px 12px":"10px 14px",background:C.card,borderRadius:12,border:`1px solid ${C.border}`,marginBottom:14}}>
      <span style={{fontSize:12,color:C.muted,width:"100%",marginBottom:3,fontWeight:600}}>Risk Scale:</span>
      {LEGEND.map(([e,w,c]) => (
        <span key={w} style={{fontSize:compact?11:12,color:c,fontWeight:700,marginRight:8}}>{e} {w}</span>
      ))}
    </div>
  );
}

function RiskMeter({score}) {
  const {label, color, sentence} = getRiskLevel(score);
  return (
    <div style={{marginBottom:14}}>
      <span style={{fontSize:20,fontWeight:900,color}}>{label}</span>
      <div style={{height:6,background:"#1e2030",borderRadius:3,overflow:"hidden",margin:"6px 0 8px"}}>
        <div style={{height:"100%",width:`${score}%`,background:`linear-gradient(90deg,#22c55e,${color})`,borderRadius:3}}/>
      </div>
      <div style={{fontSize:13,color:"#94a3b8",lineHeight:1.5,fontStyle:"italic"}}>{sentence}</div>
    </div>
  );
}

function OutcomeBlock({typeId, outcome, profile, showDemo}) {
  const t = OUTCOME_TYPES.find(x => x.id === typeId);
  if (!outcome) return null;
  const rV = outcome.byRace?.[profile.race] || outcome.byRace?.["All groups"];
  const gV = outcome.byGender?.[profile.gender] || outcome.byGender?.["All groups"];
  return (
    <div style={{background:"#0c0f1a",border:`1px solid ${C.border}`,borderRadius:12,padding:14,marginBottom:10}}>
      <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:7}}>
        <span style={{fontSize:15}}>{t.icon}</span>
        <span style={{fontSize:11,fontWeight:700,color:t.color,textTransform:"uppercase",letterSpacing:1}}>{t.label}</span>
      </div>
      <div style={{fontSize:14,fontWeight:600,color:C.text,lineHeight:1.4,marginBottom:4}}>{outcome.headline}</div>
      <div style={{fontSize:13,color:C.muted,marginBottom:showDemo?10:0}}>{outcome.stat}</div>
      {showDemo && (
        <>
          {(rV||gV) && (
            <div style={{background:C.card,borderLeft:`3px solid ${t.color}`,borderRadius:"0 8px 8px 0",padding:"9px 11px",marginBottom:8}}>
              <div style={{fontSize:10,color:"#475569",marginBottom:5,textTransform:"uppercase",letterSpacing:0.8}}>Your Profile</div>
              {rV && <div style={{fontSize:13,color:"#cbd5e1",marginBottom:3}}><span style={{color:C.muted}}>{profile.race}: </span>{rV}</div>}
              {gV && <div style={{fontSize:13,color:"#cbd5e1"}}><span style={{color:C.muted}}>{profile.gender}: </span>{gV}</div>}
            </div>
          )}
          {outcome.byRace && Object.keys(outcome.byRace).filter(k=>k!=="All groups").length>1 && (
            <div>
              <div style={{fontSize:10,color:"#374151",marginBottom:5,textTransform:"uppercase",letterSpacing:0.8}}>Compare Groups</div>
              {Object.entries(outcome.byRace).filter(([k])=>k!=="All groups").map(([race,val]) => (
                <div key={race} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:`1px solid ${C.card}`,fontSize:12}}>
                  <span style={{color:profile.race===race?t.color:"#374151",fontWeight:profile.race===race?700:400}}>{race}</span>
                  <span style={{color:profile.race===race?C.text:"#2d3348",maxWidth:"55%",textAlign:"right"}}>{val}</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function ResourceCard({emoji, label, url, desc}) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{display:"flex",gap:12,alignItems:"flex-start",background:"#0c0f1a",border:`1px solid ${C.border}`,borderRadius:12,padding:14,marginBottom:8,textDecoration:"none"}}>
      <span style={{fontSize:22,flexShrink:0}}>{emoji}</span>
      <div>
        <div style={{fontSize:14,fontWeight:700,color:"#60a5fa",marginBottom:3}}>{label} ↗</div>
        <div style={{fontSize:12,color:C.muted,lineHeight:1.4}}>{desc}</div>
      </div>
    </a>
  );
}

function ShadowSelf() {
  const [idx, setIdx] = useState(0);
  const p = SHADOW_PROFILES[idx];
  return (
    <div style={{marginBottom:24}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div>
          <div style={{fontSize:15,fontWeight:800,color:"#a78bfa"}}>👤 Shadow Self</div>
          <div style={{fontSize:12,color:C.muted,marginTop:2}}>Real profiles · Real outcomes · What could happen</div>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <button onClick={()=>setIdx(i=>(i-1+SHADOW_PROFILES.length)%SHADOW_PROFILES.length)} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"6px 12px",color:C.text,fontSize:14,cursor:"pointer",minHeight:36}}>‹</button>
          <span style={{fontSize:12,color:C.muted}}>{idx+1}/{SHADOW_PROFILES.length}</span>
          <button onClick={()=>setIdx(i=>(i+1)%SHADOW_PROFILES.length)} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"6px 12px",color:C.text,fontSize:14,cursor:"pointer",minHeight:36}}>›</button>
        </div>
      </div>
      <div style={{background:"linear-gradient(135deg,#1a1040,#161923)",border:"1px solid #2d2060",borderRadius:16,padding:18,marginBottom:12}}>
        <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:10}}>
          <span style={{fontSize:36}}>{p.emoji}</span>
          <div>
            <div style={{fontSize:17,fontWeight:800,color:C.text}}>{p.name}, {p.age} — {p.city}</div>
            <div style={{fontSize:12,color:"#7c3aed",marginTop:2}}>{p.race} · {p.gender} · {p.socio} · {p.region}</div>
          </div>
        </div>
        <div style={{fontSize:13,color:"#94a3b8",lineHeight:1.6,background:"rgba(0,0,0,0.2)",borderRadius:10,padding:"10px 12px"}}>
          <span style={{fontWeight:700,color:"#a78bfa"}}>Decision facing: </span>{p.decision}<br/>
          <span style={{color:C.muted,fontSize:12,marginTop:4,display:"block"}}>{p.context}</span>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:4}}>
        <div style={{background:"linear-gradient(135deg,#052e16,#0d2818)",border:"1px solid #166534",borderRadius:14,padding:14}}>
          <div style={{fontSize:11,fontWeight:800,color:"#22c55e",textTransform:"uppercase",letterSpacing:0.8,marginBottom:6}}>✅ Best Case</div>
          <div style={{fontSize:12,fontWeight:700,color:"#86efac",lineHeight:1.4,marginBottom:10}}>{p.bestCase.label}</div>
          {p.bestCase.outcomes.map((o,i) => (
            <div key={i} style={{display:"flex",gap:6,marginBottom:7,alignItems:"flex-start"}}>
              <span style={{fontSize:13,flexShrink:0}}>{o.icon}</span>
              <span style={{fontSize:11,color:"#d1fae5",lineHeight:1.4}}>{o.text}</span>
            </div>
          ))}
          <div style={{marginTop:10,padding:"8px 10px",background:"rgba(34,197,94,0.1)",borderRadius:8,fontSize:11,color:"#4ade80",lineHeight:1.4,fontStyle:"italic"}}>📊 {p.bestCase.stat}</div>
        </div>
        <div style={{background:"linear-gradient(135deg,#2d0a0a,#1a0808)",border:"1px solid #7f1d1d",borderRadius:14,padding:14}}>
          <div style={{fontSize:11,fontWeight:800,color:"#ef4444",textTransform:"uppercase",letterSpacing:0.8,marginBottom:6}}>⚠️ Worst Case</div>
          <div style={{fontSize:12,fontWeight:700,color:"#fca5a5",lineHeight:1.4,marginBottom:10}}>{p.worstCase.label}</div>
          {p.worstCase.outcomes.map((o,i) => (
            <div key={i} style={{display:"flex",gap:6,marginBottom:7,alignItems:"flex-start"}}>
              <span style={{fontSize:13,flexShrink:0}}>{o.icon}</span>
              <span style={{fontSize:11,color:"#fee2e2",lineHeight:1.4}}>{o.text}</span>
            </div>
          ))}
          <div style={{marginTop:10,padding:"8px 10px",background:"rgba(239,68,68,0.1)",borderRadius:8,fontSize:11,color:"#f87171",lineHeight:1.4,fontStyle:"italic"}}>📊 {p.worstCase.stat}</div>
        </div>
      </div>
      <div style={{textAlign:"center",fontSize:11,color:"#374151",marginTop:6}}>Tap ‹ › to see different profiles</div>
    </div>
  );
}

function JournalTab({saved, onUnsave}) {
  const savedScenarios = SCENARIOS.filter(s => saved.includes(s.id));
  return (
    <div style={{paddingBottom:80}}>
      <ShadowSelf />
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div style={{fontSize:15,fontWeight:800,color:C.accentLight}}>📓 Your Saved Decisions</div>
        <span style={{fontSize:12,color:C.muted}}>{savedScenarios.length} saved</span>
      </div>
      {savedScenarios.length === 0
        ? (
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:24,textAlign:"center"}}>
            <div style={{fontSize:36,marginBottom:10}}>📭</div>
            <div style={{color:C.muted,fontSize:14,lineHeight:1.6}}>No saved decisions yet.<br/>Tap <strong style={{color:C.accentLight}}>Save to Journal</strong> on any scenario to track it here.</div>
          </div>
        )
        : savedScenarios.map(sc => {
          const {label, color} = getRiskLevel(sc.riskScore);
          return (
            <div key={sc.id} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:16,marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <div style={{display:"flex",gap:10,alignItems:"center"}}>
                  <span style={{fontSize:24}}>{sc.icon}</span>
                  <div>
                    <div style={{fontWeight:700,color:C.text,fontSize:14}}>{sc.title}</div>
                    <div style={{fontSize:11,color:color,fontWeight:700,marginTop:2}}>{label}</div>
                  </div>
                </div>
                <button onClick={()=>onUnsave(sc.id)} style={{background:"none",border:`1px solid ${C.border}`,borderRadius:8,padding:"4px 10px",color:C.muted,fontSize:11,cursor:"pointer"}}>Remove</button>
              </div>
              <div style={{height:3,background:"#0c0f1a",borderRadius:2}}>
                <div style={{height:"100%",width:`${sc.riskScore}%`,background:`linear-gradient(90deg,#22c55e,${color})`,borderRadius:2}}/>
              </div>
            </div>
          );
        })
      }
    </div>
  );
}

function LifeMapTab({saved}) {
  const savedSet = new Set(saved);
  return (
    <div style={{paddingBottom:80}}>
      <div style={{marginBottom:16}}>
        <div style={{fontSize:15,fontWeight:800,color:C.accentLight,marginBottom:4}}>🗺️ Your Life Map</div>
        <div style={{fontSize:13,color:C.muted,lineHeight:1.5}}>Every decision you've saved, mapped by risk. This is your personal risk landscape.</div>
      </div>
      {saved.length === 0 && (
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:24,textAlign:"center",marginBottom:16}}>
          <div style={{fontSize:36,marginBottom:10}}>🗺️</div>
          <div style={{color:C.muted,fontSize:14,lineHeight:1.6}}>Your Life Map is empty.<br/>Save scenarios in the <strong style={{color:C.accentLight}}>Scenarios</strong> tab to build your map.</div>
        </div>
      )}
      <RiskLegend />
      {CATEGORIES.map(cat => {
        const catScenarios = SCENARIOS.filter(s => s.category === cat.id);
        return (
          <div key={cat.id} style={{marginBottom:20}}>
            <div style={{fontSize:13,fontWeight:700,color:C.muted,marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>{cat.icon} {cat.label}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {catScenarios.map(sc => {
                const isSaved = savedSet.has(sc.id);
                const {label, color} = getRiskLevel(sc.riskScore);
                return (
                  <div key={sc.id} style={{background:isSaved?C.card:"#0c0f1a",border:`1px solid ${isSaved?color:C.border}`,borderRadius:12,padding:12,opacity:isSaved?1:0.35,transition:"all 0.2s"}}>
                    <div style={{fontSize:22,marginBottom:4}}>{sc.icon}</div>
                    <div style={{fontSize:12,fontWeight:700,color:isSaved?C.text:"#374151",lineHeight:1.3,marginBottom:6}}>{sc.title}</div>
                    <div style={{height:3,background:"#1e2130",borderRadius:2,marginBottom:5}}>
                      <div style={{height:"100%",width:isSaved?`${sc.riskScore}%`:"0%",background:`linear-gradient(90deg,#22c55e,${color})`,borderRadius:2,transition:"width 0.5s"}}/>
                    </div>
                    <div style={{fontSize:10,color:isSaved?color:"#374151",fontWeight:700}}>{isSaved?label:"Not explored"}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      {saved.length > 0 && (() => {
        const savedScenarios = SCENARIOS.filter(s => savedSet.has(s.id));
        const avg = Math.round(savedScenarios.reduce((a,b) => a+b.riskScore, 0) / savedScenarios.length);
        const {label, color} = getRiskLevel(avg);
        const highest = savedScenarios.reduce((a,b) => a.riskScore>b.riskScore?a:b);
        const lowest = savedScenarios.reduce((a,b) => a.riskScore<b.riskScore?a:b);
        return (
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:16,marginTop:8}}>
            <div style={{fontSize:13,fontWeight:700,color:C.accentLight,marginBottom:10}}>📊 Your Risk Summary</div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
              <span style={{fontSize:13,color:C.muted}}>Avg risk across saved decisions</span>
              <span style={{fontSize:13,fontWeight:700,color}}>{label}</span>
            </div>
            <div style={{height:6,background:"#0c0f1a",borderRadius:3,overflow:"hidden",marginBottom:12}}>
              <div style={{height:"100%",width:`${avg}%`,background:`linear-gradient(90deg,#22c55e,${color})`,borderRadius:3}}/>
            </div>
            <div style={{display:"flex",gap:10}}>
              <div style={{flex:1,background:"#0c0f1a",borderRadius:10,padding:"10px 12px"}}>
                <div style={{fontSize:10,color:"#22c55e",fontWeight:700,marginBottom:3}}>LOWEST RISK</div>
                <div style={{fontSize:12,color:C.text,fontWeight:600}}>{lowest.icon} {lowest.title}</div>
              </div>
              <div style={{flex:1,background:"#0c0f1a",borderRadius:10,padding:"10px 12px"}}>
                <div style={{fontSize:10,color:"#ef4444",fontWeight:700,marginBottom:3}}>HIGHEST RISK</div>
                <div style={{fontSize:12,color:C.text,fontWeight:600}}>{highest.icon} {highest.title}</div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

function ScenarioDetail({scenario, profile, saved, onSave, onBack}) {
  const [showDemo, setShowDemo] = useState(true);
  const {label, color} = getRiskLevel(scenario.riskScore);
  const isSaved = saved.includes(scenario.id);
  return (
    <div style={{paddingBottom:80}}>
      <button onClick={onBack} style={{background:"none",border:"none",color:C.accentLight,fontSize:15,cursor:"pointer",marginBottom:14,padding:"10px 0",display:"flex",alignItems:"center",gap:6,minHeight:44}}>← Back</button>
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:18,marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
          <div>
            <div style={{fontSize:32,marginBottom:4}}>{scenario.icon}</div>
            <h2 style={{color:C.text,fontSize:20,fontWeight:800,margin:0,lineHeight:1.2}}>{scenario.title}</h2>
            <div style={{color:"#e2e8f0",fontSize:12,marginTop:4,fontWeight:700}}>{scenario.tagline}</div>
          </div>
          <div style={{textAlign:"right",flexShrink:0}}>
            <div style={{fontSize:15,fontWeight:900,color}}>{label}</div>
          </div>
        </div>
        <RiskMeter score={scenario.riskScore} />
        <RiskLegend compact />
        <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",marginTop:6}}>
          <button onClick={()=>onSave(scenario.id)} style={{background:isSaved?"rgba(34,197,94,0.15)":C.accent,border:`1px solid ${isSaved?"#22c55e":C.accent}`,borderRadius:10,padding:"8px 16px",color:isSaved?"#22c55e":"white",fontSize:13,fontWeight:700,cursor:"pointer",minHeight:40}}>
            {isSaved ? "✓ Saved to Journal" : "+ Save to Journal"}
          </button>
          <button onClick={()=>setShowDemo(s=>!s)} style={{background:showDemo?C.accent:"#1e2130",border:"none",borderRadius:10,padding:"8px 16px",color:"white",fontSize:13,cursor:"pointer",minHeight:40}}>
            {showDemo ? "Demo: On ✓" : "Demo: Off"}
          </button>
        </div>
      </div>
      {OUTCOME_TYPES.map(t => (
        <OutcomeBlock key={t.id} typeId={t.id} outcome={scenario.outcomes[t.id]} profile={profile} showDemo={showDemo} />
      ))}
      <div style={{background:"linear-gradient(135deg,#0d1f3c,#161923)",border:"1px solid #1e3a5f",borderRadius:14,padding:18,marginBottom:12}}>
        <div style={{fontSize:15,fontWeight:700,color:"#60a5fa",marginBottom:12}}>⚡ Paths That Beat the Odds</div>
        {scenario.beatsOdds.map((tip,i) => (
          <div key={i} style={{display:"flex",gap:10,marginBottom:10}}>
            <span style={{color:"#22c55e",flexShrink:0,fontSize:16}}>✓</span>
            <span style={{color:"#cbd5e1",fontSize:14,lineHeight:1.5}}>{tip}</span>
          </div>
        ))}
      </div>
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:18,marginBottom:14}}>
        <div style={{fontSize:15,fontWeight:700,color:"#a78bfa",marginBottom:12}}>🔗 Resources — Get Connected</div>
        {scenario.resources.map((r,i) => (
          <ResourceCard key={i} {...r} />
        ))}
      </div>
      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
        <span style={{fontSize:11,color:"#2d3348"}}>Sources:</span>
        {scenario.sources.map((s,i) => (
          <span key={i} style={{fontSize:11,color:"#2d3348",background:C.card,padding:"3px 9px",borderRadius:8}}>{s}</span>
        ))}
      </div>
    </div>
  );
}

function ScenarioExplorer({profile, saved, onSave}) {
  const [cat, setCat] = useState("education");
  const [selected, setSelected] = useState(null);
  if (selected) return (<ScenarioDetail scenario={selected} profile={profile} saved={saved} onSave={onSave} onBack={()=>setSelected(null)} />);
  return (
    <div>
      <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:8,marginBottom:14,WebkitOverflowScrolling:"touch",scrollbarWidth:"none"}}>
        {CATEGORIES.map(c => (
          <button key={c.id} onClick={()=>setCat(c.id)} style={{flexShrink:0,background:cat===c.id?C.accent:C.card,border:`1px solid ${cat===c.id?C.accent:C.border}`,borderRadius:24,padding:"10px 18px",color:cat===c.id?"white":"#94a3b8",fontSize:14,fontWeight:cat===c.id?700:400,cursor:"pointer",whiteSpace:"nowrap",minHeight:44}}>
            {c.icon} {c.label}
          </button>
        ))}
      </div>
      <RiskLegend />
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {SCENARIOS.filter(s=>s.category===cat).map(sc => {
          const {label, color} = getRiskLevel(sc.riskScore);
          const isSaved = saved.includes(sc.id);
          return (
            <div key={sc.id} onClick={()=>setSelected(sc)} style={{background:C.card,border:`1px solid ${isSaved?color:C.border}`,borderRadius:16,padding:18,cursor:"pointer"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{display:"flex",gap:12,alignItems:"center"}}>
                  <span style={{fontSize:28}}>{sc.icon}</span>
                  <div>
                    <div style={{fontWeight:700,color:C.text,fontSize:15}}>{sc.title}</div>
                    <div style={{color:"#e2e8f0",fontSize:12,marginTop:3,fontWeight:700}}>{sc.tagline}</div>
                  </div>
                </div>
                <div style={{textAlign:"right",flexShrink:0,marginLeft:10}}>
                  <div style={{fontSize:15,fontWeight:900,color}}>{label}</div>
                  {isSaved && <div style={{fontSize:10,color:"#22c55e",marginTop:2}}>✓ Saved</div>}
                </div>
              </div>
              <div style={{marginTop:12,height:4,background:"#0c0f1a",borderRadius:2}}>
                <div style={{height:"100%",width:`${sc.riskScore}%`,background:`linear-gradient(90deg,#22c55e,${color})`,borderRadius:2}}/>
              </div>
              <div style={{marginTop:10,display:"flex",alignItems:"center"}}>
                {OUTCOME_TYPES.map(t => <span key={t.id} style={{fontSize:14,opacity:0.4,marginRight:6}}>{t.icon}</span>)}
                <span style={{marginLeft:"auto",fontSize:12,color:"#2d3348"}}>Tap to explore →</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PersonalAssessment({profile}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const q = ASSESSMENT_QUESTIONS[step - 1];

  const handleNext = () => {
    const updated = {...answers, [q.id]: current};
    setAnswers(updated);
    setCurrent("");
    if (step < ASSESSMENT_QUESTIONS.length) { setStep(s => s+1); }
    else { setStep(7); runAnalysis(updated); }
  };

  const runAnalysis = async (a) => {
    setLoading(true);
    try {
      const prompt = `You are LifeLens, an empowering life decision advisor for young adults. Use real demographic data to give honest, personalized insights with paths forward.
Profile: Race/Ethnicity: ${profile.race} | Gender: ${profile.gender} | Socioeconomic: ${profile.socioeconomic} | Region: ${profile.region}
Situation:\n${Object.entries(a).map(([k,v])=>`${k}: ${v}`).join("\n")}
Structure your response EXACTLY as follows:
## Decision Summary
2 sentences framing what they're facing.
## Your Risk Profile
4 bullet points with specific statistics relevant to their demographics and decision.
## Key Factors Working For You
3 bullet points of real strengths specific to their situation.
## What the Data Actually Says
2–3 paragraphs. Honest, nuanced, contextualized. Show the path through.
## Your Next 4 Steps
4 concrete, specific, actionable steps tailored to their demographics and situation.
## Remember This
One powerful sentence — the most important thing for this person.
Tone: direct, non-judgmental, empowering. Never preachy.`;

      const res = await fetch("/api/assess", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({model:"claude-sonnet-4-20250514", max_tokens:1000, messages:[{role:"user", content:prompt}]})
      });
      const data = await res.json();
      setResult(data.content?.find(b => b.type==="text")?.text || "Unable to generate. Please try again.");
    } catch(e) {
      setResult("Error generating analysis. Please try again.");
    }
    setLoading(false);
  };

  const renderText = (text) => text.split("\n").map((line, i) => {
    if (line.startsWith("## ")) return (<h3 key={i} style={{color:C.accentLight,fontSize:13,fontWeight:700,marginTop:18,marginBottom:8,textTransform:"uppercase",letterSpacing:0.5}}>{line.slice(3)}</h3>);
    if (line.startsWith("- ") || line.startsWith("• ")) return (<div key={i} style={{display:"flex",gap:9,marginBottom:7}}><span style={{color:"#22c55e",flexShrink:0}}>•</span><span style={{color:"#cbd5e1",fontSize:14,lineHeight:1.55}}>{line.replace(/^[-•]\s/,"")}</span></div>);
    if (!line.trim()) return (<div key={i} style={{height:6}} />);
    return (<p key={i} style={{color:"#cbd5e1",fontSize:14,lineHeight:1.65,margin:"0 0 6px"}}>{line}</p>);
  });

  if (step === 0) return (
    <div style={{textAlign:"center",padding:"40px 16px",paddingBottom:80}}>
      <div style={{fontSize:48,marginBottom:14}}>🔍</div>
      <h2 style={{color:C.text,fontSize:21,fontWeight:800,marginBottom:12}}>Personal Risk Assessment</h2>
      <p style={{color:C.muted,fontSize:14,lineHeight:1.7,marginBottom:28,maxWidth:340,margin:"0 auto 28px"}}>Answer 6 questions about your specific situation. The AI uses real demographic data to generate a personalized risk profile — plus your paths forward.</p>
      <button onClick={()=>setStep(1)} style={{background:"linear-gradient(135deg,#4f46e5,#7c3aed)",border:"none",borderRadius:14,padding:"16px 36px",color:"white",fontSize:16,fontWeight:700,cursor:"pointer",minHeight:52}}>Start My Assessment →</button>
    </div>
  );

  if (step <= ASSESSMENT_QUESTIONS.length) {
    const progress = (step / ASSESSMENT_QUESTIONS.length) * 100;
    return (
      <div style={{paddingBottom:80}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
          <span style={{fontSize:13,color:C.muted}}>Question {step} of {ASSESSMENT_QUESTIONS.length}</span>
          <span style={{fontSize:13,color:C.accent}}>{Math.round(progress)}%</span>
        </div>
        <div style={{height:4,background:C.card,borderRadius:2,marginBottom:22}}>
          <div style={{height:"100%",width:`${progress}%`,background:C.accent,borderRadius:2}}/>
        </div>
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:20}}>
          <h3 style={{color:C.text,fontSize:17,fontWeight:600,marginBottom:20,lineHeight:1.4}}>{q.label}</h3>
          {q.type === "text"
            ? <textarea value={current} onChange={e=>setCurrent(e.target.value)} placeholder={q.placeholder} style={{width:"100%",background:C.bg,border:`1px solid ${C.border}`,borderRadius:12,padding:"14px",color:C.text,fontSize:16,minHeight:100,resize:"vertical",outline:"none",boxSizing:"border-box",fontFamily:"inherit"}}/>
            : q.options.map(opt => (
                <button key={opt} onClick={()=>setCurrent(opt)} style={{display:"block",width:"100%",background:current===opt?"rgba(79,70,229,0.2)":C.bg,border:`1px solid ${current===opt?C.accent:C.border}`,borderRadius:12,padding:"14px 16px",color:current===opt?"#a5b4fc":"#94a3b8",fontSize:15,cursor:"pointer",textAlign:"left",fontWeight:current===opt?700:400,marginBottom:8,minHeight:52}}>{opt}</button>
              ))
          }
          <button onClick={handleNext} disabled={!current.trim()} style={{marginTop:12,width:"100%",background:current.trim()?"linear-gradient(135deg,#4f46e5,#7c3aed)":"#1e2130",border:"none",borderRadius:12,padding:"16px",color:current.trim()?"white":"#374151",fontSize:16,fontWeight:700,cursor:current.trim()?"pointer":"not-allowed",minHeight:52}}>
            {step === ASSESSMENT_QUESTIONS.length ? "Generate My Analysis →" : "Next →"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{paddingBottom:80}}>
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:18,marginBottom:12,textAlign:"center"}}>
        <div style={{fontSize:30,marginBottom:6}}>🔮</div>
        <h2 style={{color:C.accentLight,fontSize:18,fontWeight:800,margin:0}}>Your Personal Risk Analysis</h2>
        <div style={{color:"#374151",fontSize:12,marginTop:4}}>{profile.gender} · {profile.race} · {profile.socioeconomic} · {profile.region}</div>
      </div>
      {loading
        ? (
          <div style={{textAlign:"center",padding:"48px 20px"}}>
            <div style={{width:38,height:38,border:"3px solid #1e2130",borderTop:`3px solid ${C.accent}`,borderRadius:"50%",margin:"0 auto 14px",animation:"spin 1s linear infinite"}}/>
            <div style={{color:C.muted,fontSize:14}}>Analyzing with real demographic data…</div>
          </div>
        )
        : (
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:20}}>
            {renderText(result || "")}
            <button onClick={()=>{setStep(0);setAnswers({});setCurrent("");setResult(null);}} style={{marginTop:20,width:"100%",background:C.bg,border:`1px solid ${C.border}`,borderRadius:12,padding:"14px",color:C.muted,fontSize:14,cursor:"pointer",minHeight:50}}>↺ Start a New Assessment</button>
          </div>
        )
      }
    </div>
  );
}

function Onboarding({onComplete}) {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({race:"", gender:"", socioeconomic:"", region:""});
  const fields = [
    {key:"race", label:"How do you identify racially or ethnically?", icon:"🌍", options:RACES},
    {key:"gender", label:"How do you identify?", icon:"🧬", options:GENDERS},
    {key:"socioeconomic", label:"What best describes your economic background?", icon:"💵", options:SOCIO},
    {key:"region", label:"What type of area do you live in?", icon:"📍", options:REGIONS},
  ];
  const f = fields[step - 1];
  const pick = (val) => {
    const updated = {...profile, [f?.key]: val};
    setProfile(updated);
    if (step < fields.length) { setTimeout(() => setStep(s => s+1), 180); }
    else { setTimeout(() => onComplete(updated), 180); }
  };
  return (
    <div style={{background:C.bg,minHeight:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <div style={{fontSize:48,marginBottom:10}}>🧭</div>
        <h1 style={{color:C.text,fontSize:26,fontWeight:900,margin:0}}>LifeLens</h1>
        <p style={{color:"#374151",fontSize:13,marginTop:6}}>Real data · Real decisions · Your future</p>
      </div>
      {step === 0
        ? (
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:18,padding:26,maxWidth:400,width:"100%",textAlign:"center"}}>
            <p style={{color:"#94a3b8",fontSize:15,lineHeight:1.75,marginBottom:22}}>LifeLens shows the <strong style={{color:C.accentLight}}>real statistical outcomes</strong> of major life decisions — broken down by race, gender, and background. Not to limit you, but so you can make choices with <strong style={{color:"#22c55e"}}>full information</strong>.</p>
            <div style={{color:C.muted,fontSize:13,marginBottom:22}}>We'll ask 4 quick questions to personalize your results.</div>
            <button onClick={()=>setStep(1)} style={{background:"linear-gradient(135deg,#4f46e5,#7c3aed)",border:"none",borderRadius:14,padding:"16px",width:"100%",color:"white",fontSize:16,fontWeight:700,cursor:"pointer",minHeight:52}}>Get Started →</button>
            <div style={{marginTop:14,fontSize:12,color:"#1e2130"}}>Your data stays private and is never stored</div>
          </div>
        )
        : (
          <>
            <div style={{display:"flex",gap:8,marginBottom:22}}>
              {fields.map((_,i) => (
                <div key={i} style={{width:9,height:9,borderRadius:5,background:i<step?C.accent:"#1e2130"}}/>
              ))}
            </div>
            <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:18,padding:26,maxWidth:400,width:"100%"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                <span style={{fontSize:13,color:C.muted}}>Step {step} of {fields.length}</span>
                <span style={{fontSize:13,color:C.accent,fontWeight:700}}>{Math.round((step/fields.length)*100)}%</span>
              </div>
              <div style={{fontSize:26,textAlign:"center",marginBottom:10}}>{f.icon}</div>
              <h2 style={{color:C.text,fontSize:17,fontWeight:700,textAlign:"center",marginBottom:18,lineHeight:1.4}}>{f.label}</h2>
              {f.options.map(opt => (
                <button key={opt} onClick={()=>pick(opt)} style={{display:"block",width:"100%",background:profile[f.key]===opt?"rgba(79,70,229,0.2)":C.bg,border:`1px solid ${profile[f.key]===opt?C.accent:C.border}`,borderRadius:12,padding:"14px 16px",color:profile[f.key]===opt?"#a5b4fc":"#94a3b8",fontSize:15,fontWeight:profile[f.key]===opt?700:400,cursor:"pointer",textAlign:"left",marginBottom:10,minHeight:52}}>{opt}</button>
              ))}
            </div>
          </>
        )
      }
    </div>
  );
}

function PasswordGate({onUnlock}) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const check = () => {
    if (input === "lifelens2025") { onUnlock(); }
    else { setError(true); setInput(""); setTimeout(() => setError(false), 2000); }
  };
  return (
    <div style={{background:C.bg,minHeight:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{textAlign:"center",marginBottom:32}}>
        <div style={{fontSize:52,marginBottom:12}}>🧭</div>
        <h1 style={{color:C.text,fontSize:26,fontWeight:900,margin:0}}>LifeLens</h1>
        <p style={{color:C.muted,fontSize:13,marginTop:6}}>Real data · Real decisions · Your future</p>
      </div>
      <div style={{background:C.card,border:`1px solid ${error?"#ef4444":C.border}`,borderRadius:18,padding:28,maxWidth:380,width:"100%",textAlign:"center",transition:"border-color 0.3s"}}>
        <div style={{fontSize:15,fontWeight:700,color:C.accentLight,marginBottom:6}}>🔒 Enter Access Code</div>
        <div style={{fontSize:13,color:C.muted,marginBottom:20}}>This app is currently in private beta.</div>
        <input
          type="password"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && check()}
          placeholder="Enter access code"
          style={{width:"100%",background:C.bg,border:`1px solid ${error?"#ef4444":C.border}`,borderRadius:12,padding:"14px",color:C.text,fontSize:16,outline:"none",boxSizing:"border-box",textAlign:"center",letterSpacing:4,marginBottom:12}}
        />
        {error && <div style={{color:"#ef4444",fontSize:13,marginBottom:10}}>Incorrect code — try again</div>}
        <button onClick={check} style={{width:"100%",background:"linear-gradient(135deg,#4f46e5,#7c3aed)",border:"none",borderRadius:12,padding:"14px",color:"white",fontSize:15,fontWeight:700,cursor:"pointer",minHeight:50}}>
          Enter →
        </button>
      </div>
    </div>
  );
}

export default function LifeLens() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem("ll_unlocked") === "true");
  const unlock = () => { sessionStorage.setItem("ll_unlocked","true"); setUnlocked(true); };
  if (!unlocked) return (<PasswordGate onUnlock={unlock} />);
  const [profile, setProfile] = useState(null);
  const [tab, setTab] = useState("explorer");
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    try {
      const data = localStorage.getItem("journal_saved");
      if (data) setSaved(JSON.parse(data));
    } catch {}
  }, []);

  const handleSave = (id) => {
    const updated = saved.includes(id) ? saved.filter(x => x !== id) : [...saved, id];
    setSaved(updated);
    try { localStorage.setItem("journal_saved", JSON.stringify(updated)); } catch {}
  };

  if (!profile) return (<Onboarding onComplete={setProfile} />);

  const TABS = [
    {id:"explorer", label:"Scenarios", icon:"🗺️"},
    {id:"assessment", label:"Assessment", icon:"🔍"},
    {id:"journal", label:"Journal", icon:"📓"},
    {id:"lifemap", label:"Life Map", icon:"🌐"},
  ];

  return (
    <div style={{background:C.bg,minHeight:"100%",color:C.text,fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>
      <div style={{background:C.card,borderBottom:`1px solid ${C.border}`,padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontSize:20}}>🧭</span>
          <span style={{fontWeight:900,fontSize:18,color:C.accentLight}}>LifeLens</span>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <span style={{fontSize:12,color:"#374151"}}>{profile.gender.split(" ")[0]} · {profile.race}</span>
          <button onClick={()=>setProfile(null)} style={{background:"none",border:`1px solid ${C.border}`,borderRadius:8,padding:"5px 11px",color:C.muted,fontSize:12,cursor:"pointer",minHeight:34}}>Edit</button>
        </div>
      </div>
      <div style={{maxWidth:600,margin:"0 auto",padding:"18px 16px"}}>
        {tab === "explorer" && <ScenarioExplorer profile={profile} saved={saved} onSave={handleSave} />}
        {tab === "assessment" && <PersonalAssessment profile={profile} />}
        {tab === "journal" && <JournalTab saved={saved} onUnsave={handleSave} />}
        {tab === "lifemap" && <LifeMapTab saved={saved} />}
      </div>
      <div style={{position:"fixed",bottom:0,left:0,right:0,background:C.card,borderTop:`1px solid ${C.border}`,display:"flex",zIndex:100}}>
        {TABS.map(t => (
          <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,background:"none",border:"none",borderTop:tab===t.id?`3px solid ${C.accent}`:"3px solid transparent",padding:"10px 4px 8px",color:tab===t.id?C.accentLight:C.muted,fontSize:11,fontWeight:tab===t.id?700:400,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,minHeight:58}}>
            <span style={{fontSize:18}}>{t.icon}</span>{t.label}
          </button>
        ))}
      </div>
      <style>{`
        html, body, #root { margin: 0; padding: 0; height: 100%; }
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        textarea:focus { border-color: #4f46e5 !important; outline: none; }
        @keyframes spin { to { transform: rotate(360deg); } }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}

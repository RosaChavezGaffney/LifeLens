import { useState, useEffect } from "react";

// ── TRANSLATIONS ──────────────────────────────────────────────────────────────
const TX = {
  en: {
    appTagline:"Real data · Real decisions · Your future",
    getStarted:"Get Started →",editProfile:"Edit",riskScale:"Risk Scale:",
    saveToJournal:"+ Save to Journal",savedToJournal:"✓ Saved to Journal",
    back:"← Back",demoOn:"Demo: On ✓",demoOff:"Demo: Off",
    yourProfile:"Your Profile",compareGroups:"Compare Groups",
    pathsBeatOdds:"⚡ Paths That Beat the Odds",resources:"🔗 Resources — Get Connected",
    sources:"Sources:",notExplored:"Not explored",tapExplore:"TAP TO EXPLORE →",
    remove:"Remove",bestCase:"✅ Best Case",worstCase:"⚠️ Worst Case",
    decisionFacing:"Decision facing:",swipeProfiles:"Swipe ‹ › to see different profiles",
    shadowSelf:"👤 Shadow Self",shadowSubtitle:"Real profiles · Real outcomes · What could happen",
    savedDecisions:"📓 Your Saved Decisions",noSaved:"No saved decisions yet.",
    tapSave:"Tap Save to Journal on any scenario to track it here.",
    lifeMap:"🗺️ Your Life Map",lifeMapSub:"Every decision you've saved, mapped by risk.",
    riskSummary:"📊 Your Risk Summary",avgRisk:"Avg risk across saved decisions",
    lowestRisk:"LOWEST RISK",highestRisk:"HIGHEST RISK",
    assessment:"Personal Risk Assessment",
    assessmentSub:"Answer 6 questions about your specific situation. AI uses real demographic data to generate a personalized risk profile — plus your paths forward.",
    startAssessment:"Start My Assessment →",question:"Question",of:"of",
    next:"Next →",generateAnalysis:"Generate My Analysis →",
    yourAnalysis:"Your Personal Risk Analysis",analyzing:"Analyzing with real demographic data…",
    newAssessment:"↺ Start a New Assessment",
    onboardingIntro:"LifeLens shows the real statistical outcomes of major life decisions — broken down by race, gender, and background. Not to limit you, but so you can make choices with full information.",
    onboardingPrivacy:"Your data stays private and is never stored",
    questions4:"We'll ask 4 quick questions to personalize your results.",step:"Step",
    tabs:{explorer:"Scenarios",assessment:"Assessment",journal:"Journal",lifemap:"Life Map",story:"My Story"},
    writeStoryTitle:"✍️ My Story",
    writeStorySub:"This is where your journey gets personal.",
    writeStoryPlaceholder:"Tell me what's going on. What decision are you facing? What's holding you back? What are you hoping for? Write as much or as little as you want...",
    yourName:"Your first name (optional)",namePlaceholder:"e.g. Alex",
    generateStory:"Generate My Shadow Self →",generating:"Creating your personal story...",
    yourShadowSelf:"✨ Your Shadow Self",tryAgain:"↺ Write a New Story",
    messageFrom:"A message for you:",
    readyBtn:"I'm Ready — Show Me My Data →",
    enterCode:"Enter your access code",
    privateBeta:"LifeLens is in private beta — enter the code to continue.",
    enterPlaceholder:"Access code",
    wrongCode:"Incorrect code. Please try again.",
    enterBtn:"Enter LifeLens →",
  },
  es: {
    appTagline:"Datos reales · Decisiones reales · Tu futuro",
    getStarted:"Comenzar →",editProfile:"Editar",riskScale:"Escala de Riesgo:",
    saveToJournal:"+ Guardar en Diario",savedToJournal:"✓ Guardado",
    back:"← Atrás",demoOn:"Demo: Activado ✓",demoOff:"Demo: Desactivado",
    yourProfile:"Tu Perfil",compareGroups:"Comparar Grupos",
    pathsBeatOdds:"⚡ Caminos que Superan las Probabilidades",
    resources:"🔗 Recursos — Conéctate",sources:"Fuentes:",notExplored:"No explorado",
    tapExplore:"TOCA PARA EXPLORAR →",remove:"Quitar",
    bestCase:"✅ Mejor Caso",worstCase:"⚠️ Peor Caso",
    decisionFacing:"Decisión que enfrenta:",swipeProfiles:"Desliza ‹ › para ver otros perfiles",
    shadowSelf:"👤 Tu Sombra",shadowSubtitle:"Perfiles reales · Resultados reales · Lo que podría pasar",
    savedDecisions:"📓 Tus Decisiones Guardadas",noSaved:"Aún no hay decisiones guardadas.",
    tapSave:"Toca Guardar en Diario en cualquier escenario.",
    lifeMap:"🗺️ Tu Mapa de Vida",lifeMapSub:"Cada decisión guardada, mapeada por riesgo.",
    riskSummary:"📊 Tu Resumen de Riesgo",avgRisk:"Riesgo promedio de tus decisiones",
    lowestRisk:"MENOR RIESGO",highestRisk:"MAYOR RIESGO",
    assessment:"Evaluación Personal de Riesgo",
    assessmentSub:"Responde 6 preguntas. La IA usa datos demográficos reales para generar tu perfil personalizado.",
    startAssessment:"Comenzar Mi Evaluación →",question:"Pregunta",of:"de",
    next:"Siguiente →",generateAnalysis:"Generar Mi Análisis →",
    yourAnalysis:"Tu Análisis Personal de Riesgo",analyzing:"Analizando con datos reales…",
    newAssessment:"↺ Nueva Evaluación",
    onboardingIntro:"LifeLens muestra los resultados estadísticos reales de las grandes decisiones — por raza, género y contexto. No para limitarte, sino para que elijas con información completa.",
    onboardingPrivacy:"Tus datos son privados y nunca se almacenan",
    questions4:"Te haremos 4 preguntas rápidas para personalizar tus resultados.",step:"Paso",
    tabs:{explorer:"Escenarios",assessment:"Evaluación",journal:"Diario",lifemap:"Mapa de Vida",story:"Mi Historia"},
    writeStoryTitle:"✍️ Mi Historia",
    writeStorySub:"Aquí es donde tu viaje se vuelve personal.",
    writeStoryPlaceholder:"Cuéntame qué está pasando. ¿Qué decisión enfrentas? ¿Qué te detiene? Escribe lo que quieras...",
    yourName:"Tu nombre (opcional)",namePlaceholder:"ej. Alex",
    generateStory:"Generar Mi Sombra →",generating:"Creando tu historia personal...",
    yourShadowSelf:"✨ Tu Sombra Personal",tryAgain:"↺ Escribir Una Nueva Historia",
    messageFrom:"Un mensaje para ti:",
    readyBtn:"Estoy Listo/a — Muéstrame los Datos →",
    enterCode:"Ingresa tu código de acceso",
    privateBeta:"LifeLens está en versión privada — ingresa el código para continuar.",
    enterPlaceholder:"Código de acceso",
    wrongCode:"Código incorrecto. Por favor intenta de nuevo.",
    enterBtn:"Entrar a LifeLens →",
  }
};
const tx=(lang,key)=>{
  const keys=key.split(".");
  let v=TX[lang];
  for(const k of keys)v=v?.[k];
  return v||TX.en[key.split(".").pop()]||key;
};

// ── CONSTANTS ─────────────────────────────────────────────────────────────────
const RACES=["White","Black","Hispanic","Asian","Indigenous","Multiracial / Other"];
const GENDERS=["Man","Woman","Non-binary / Gender non-conforming"];
const SOCIO=["Low income","Working class","Middle class","Upper middle class"];
const REGIONS=["Urban (major city)","Suburban","Small city / town","Rural"];
const RACES_ES=["Blanco/a","Negro/a","Hispano/a","Asiático/a","Indígena","Multirracial / Otro"];
const GENDERS_ES=["Hombre","Mujer","No binario / No conforme con el género"];
const SOCIO_ES=["Bajos ingresos","Clase trabajadora","Clase media","Clase media alta"];
const REGIONS_ES=["Urbano (ciudad grande)","Suburbano","Ciudad / pueblo pequeño","Rural"];
const getRaceEs=(r)=>{const i=RACES.indexOf(r);return i>=0?RACES_ES[i]:r;};
const getGenderEs=(g)=>{const i=GENDERS.indexOf(g);return i>=0?GENDERS_ES[i]:g;};
const getSocioEs=(s)=>{const i=SOCIO.indexOf(s);return i>=0?SOCIO_ES[i]:s;};
const getRegionEs=(r)=>{const i=REGIONS.indexOf(r);return i>=0?REGIONS_ES[i]:r;};
const CATEGORIES=[
  {id:"education",label:"Education",labelEs:"Educación",icon:"🎓"},
  {id:"career",label:"Career",labelEs:"Carrera",icon:"💼"},
  {id:"relationships",label:"Relationships",labelEs:"Relaciones",icon:"❤️"},
  {id:"lifestyle",label:"Lifestyle",labelEs:"Estilo de Vida",icon:"🌆"},
  {id:"identity",label:"Identity & Health",labelEs:"Identidad y Salud",icon:"🌱"},
];
const OUTCOME_TYPES=[
  {id:"financial",label:"Financial",labelEs:"Financiero",icon:"💰",color:"#818cf8"},
  {id:"health",label:"Health",labelEs:"Salud",icon:"🏥",color:"#22c55e"},
  {id:"relationship",label:"Family",labelEs:"Familia",icon:"💞",color:"#c084fc"},
  {id:"legal",label:"Legal",labelEs:"Legal",icon:"⚖️",color:"#f59e0b"},
];

// ── DEEP PURPLE PALETTE ───────────────────────────────────────────────────────
const C={
  bg:"#13072e",          // deep jewel background
  card:"#1e1040",        // rich purple card surface
  border:"#3d2070",      // purple border
  text:"#ffffff",        // pure white — maximum readability
  muted:"#c4b5fd",       // bright lavender — was dark, now fully legible
  accent:"#7c3aed",      // vivid purple accent
  accentLight:"#e9d5ff", // near-white lavender for headings
  accentBright:"#f0abfc",// bright pink-purple for highlights
  deep:"#0d0520",        // deepest background layer
};

const LEGEND_EN=[["🟢","Chill","#22c55e"],["🟡","Risky","#f59e0b"],["🟠","Seriously Risky","#f97316"],["🔴","High Stakes","#ef4444"]];
const LEGEND_ES=[["🟢","Tranquilo","#22c55e"],["🟡","Riesgoso","#f59e0b"],["🟠","Muy Riesgoso","#f97316"],["🔴","Alto Riesgo","#ef4444"]];

// ── SHADOW PROFILES ───────────────────────────────────────────────────────────
const SHADOW_PROFILES=[
  {name:"Aisha",age:18,emoji:"👩🏾",race:"Black",gender:"Woman",socio:"Low income",region:"Urban (major city)",city:"Chicago, IL",
   decision:"Drop out of high school to work full time",
   context:"Her family needs income now. She's considering leaving school to take a full-time retail job paying $14/hr.",
   bestCase:{label:"She gets her GED + enrolls in community college",outcomes:[{icon:"💰",text:"Earns $42K by age 25 with an associate degree — 55% more than staying in retail"},{icon:"🏥",text:"Qualifies for employer health insurance through a healthcare admin job"},{icon:"💞",text:"Builds stable foundation — financial stress reduced, relationship health improves"},{icon:"⚖️",text:"Clean record, growing professional network, upward mobility trajectory"}],stat:"Black women with associate degrees earn 61% more over their lifetime than those without"},
   worstCase:{label:"She stays in retail with no credential",outcomes:[{icon:"💰",text:"Still earning $15–17/hr at 25 — below living wage in Chicago"},{icon:"🏥",text:"72% chance of being uninsured — one emergency away from serious debt"},{icon:"💞",text:"Financial instability is the #1 stressor in relationships"},{icon:"⚖️",text:"Economic precarity increases risk of legal system contact"}],stat:"High school dropouts earn $400K less over their lifetime — the gap widens every year"}},
  {name:"Carlos",age:19,emoji:"👨🏽",race:"Hispanic",gender:"Man",socio:"Working class",region:"Suburban",city:"San Antonio, TX",
   decision:"Start a business instead of going to college",
   context:"He has a landscaping side hustle making $800/month. He wants to go full-time and skip college entirely.",
   bestCase:{label:"He formalizes the business + takes free SBA mentorship",outcomes:[{icon:"💰",text:"Grows to $65K revenue by 25 with 2 employees — matches college-grad median earnings"},{icon:"🏥",text:"Joins a business owners' health co-op — coverage for ~$180/month"},{icon:"💞",text:"Business ownership creates pride and stability — relationship satisfaction high"},{icon:"⚖️",text:"LLC structure protects personal assets — tax records kept clean from day one"}],stat:"Hispanic-owned businesses are among the fastest growing in the US — the market is there"},
   worstCase:{label:"He runs it informally with no structure or plan",outcomes:[{icon:"💰",text:"Business fails within 3 years (82% do without a plan) — back to square one with no degree"},{icon:"🏥",text:"Uninsured for 4+ years — average cost of a single ER visit: $2,200"},{icon:"💞",text:"62% of founders report severe relationship strain in years 1–3 without support systems"},{icon:"⚖️",text:"IRS penalties for unreported self-employment income average $1,200"}],stat:"80% of businesses that fail cite lack of planning and capital as the primary cause"}},
  {name:"Madison",age:20,emoji:"👩🏼",race:"White",gender:"Woman",socio:"Middle class",region:"Rural",city:"Rural Kentucky",
   decision:"Get married at 20 and start a family",
   context:"She's been with her partner for 2 years. They're talking about skipping college and starting life together now.",
   bestCase:{label:"They take pre-marital counseling + build financial foundation first",outcomes:[{icon:"💰",text:"Both working by 22 with clear budget — household income $68K, on track for home ownership by 27"},{icon:"🏥",text:"Stable marriage is one of the strongest predictors of long-term physical and mental health"},{icon:"💞",text:"Couples with shared financial goals have 40% lower conflict and divorce rates"},{icon:"⚖️",text:"Low legal risk — wills and basic legal documents set up early protect both partners"}],stat:"Couples who complete pre-marital education report 30% higher relationship satisfaction"},
   worstCase:{label:"They marry quickly without financial or communication foundation",outcomes:[{icon:"💰",text:"45% of under-25 marriages in rural areas end in divorce — average cost: $15,000"},{icon:"🏥",text:"Unhappy marriage is clinically worse for mental health than being single — depression rates double"},{icon:"💞",text:"First child within year 1 + financial stress = top predictor of early separation"},{icon:"⚖️",text:"Custody and asset division in rural areas often requires expensive legal help with limited access"}],stat:"Women who divorce before 25 take an average of 5 years to financially recover"}},
  {name:"James",age:18,emoji:"👨🏽‍🦱",race:"Indigenous",gender:"Man",socio:"Low income",region:"Rural",city:"Rural Montana",
   decision:"Enlist in the Army after high school",
   context:"Few jobs exist near home. He sees the military as a way out and a path to stability.",
   bestCase:{label:"He enlists, uses the GI Bill, and plans his exit from day one",outcomes:[{icon:"💰",text:"$38K salary + free housing + healthcare on day one. GI Bill covers 4-year degree after service"},{icon:"🏥",text:"Full VA healthcare for life — one of the strongest benefits available to any American"},{icon:"💞",text:"Military community provides structure and belonging — strong transition support if used"},{icon:"⚖️",text:"SCRA protections freeze debt interest during service — powerful financial safeguard"}],stat:"Veterans who use the GI Bill have 40% higher lifetime earnings than non-college peers"},
   worstCase:{label:"He enlists without support awareness and struggles with transition",outcomes:[{icon:"💰",text:"Veterans without a degree plan post-service often return to low-wage work — GI Bill unused by 40%"},{icon:"🏥",text:"PTSD affects 20% of combat veterans — Indigenous veterans are least likely to seek VA mental health care"},{icon:"💞",text:"Military divorce rate 15% higher than civilian — deployment + isolation strains family ties"},{icon:"⚖️",text:"Indigenous veterans face disproportionate barriers accessing VA benefits — advocacy is essential"}],stat:"Indigenous veterans are the most decorated per capita — and the most underserved by VA systems"}},
  {name:"Priya",age:21,emoji:"👩🏽",race:"Asian",gender:"Woman",socio:"Upper middle class",region:"Urban (major city)",city:"New York, NY",
   decision:"Take a gap year before starting her career",
   context:"Just graduated college. Has a job offer but feels burned out. Thinking about a year of travel and volunteering.",
   bestCase:{label:"She defers the job offer + does a structured gap program",outcomes:[{icon:"💰",text:"Returns to the job offer refreshed — studies show gap year grads earn 8% more within 5 years"},{icon:"🏥",text:"88% of gap year alumni report significantly improved mental health and sense of purpose"},{icon:"💞",text:"Self-awareness gained leads to healthier relationships — she knows what she actually wants"},{icon:"⚖️",text:"No legal risk — AmeriCorps and structured programs provide visa and legal support abroad"}],stat:"90% of employers view gap year experience favorably — it's a differentiator, not a gap"},
   worstCase:{label:"She quits without a plan and drifts for a year",outcomes:[{icon:"💰",text:"Loses the job offer — re-entering the NYC job market takes 8–14 months on average"},{icon:"🏥",text:"Unstructured time without purpose can worsen anxiety — isolation risk is real"},{icon:"💞",text:"Financial dependence on family strains those relationships — guilt and pressure build"},{icon:"⚖️",text:"Overstaying visas abroad or working illegally creates immigration complications"}],stat:"The difference between a good and bad gap year is almost entirely about structure and intention"}},
  {name:"Jordan",age:19,emoji:"🧑🏽",race:"Multiracial / Other",gender:"Non-binary / Gender non-conforming",socio:"Working class",region:"Small city / town",city:"Albuquerque, NM",
   decision:"Go full-time gig economy instead of pursuing any degree or trade",
   context:"Making $1,200/month driving for Uber and doing TaskRabbit jobs. It feels like freedom.",
   bestCase:{label:"They treat gig work as a launchpad + build a high-skill freelance niche",outcomes:[{icon:"💰",text:"Develops a specialty (e.g. graphic design, coding) — freelance income reaches $55K by 25"},{icon:"🏥",text:"Qualifies for ACA subsidies — gets health coverage for under $100/month"},{icon:"💞",text:"Flexibility allows them to be present for community — quality of life high when income is stable"},{icon:"⚖️",text:"LLC formation + quarterly tax filing keeps them legally protected and audit-proof"}],stat:"Skilled freelancers who specialize earn 3x more than general gig workers within 3 years"},
   worstCase:{label:"They stay in low-skill gig work with no plan to grow",outcomes:[{icon:"💰",text:"$32K median annual income — below living wage in most US cities by 2027 due to inflation"},{icon:"🏥",text:"78% of non-binary gig workers are uninsured — highest uninsured rate of any demographic"},{icon:"💞",text:"Income instability is the #1 predictor of relationship breakdown regardless of gender identity"},{icon:"⚖️",text:"Accumulated IRS penalties for unfiled self-employment taxes average $3,400 — very common"}],stat:"Non-binary workers face a 32% wage gap vs. cisgender peers — gig work amplifies rather than escapes it"}},
  {name:"Sofia",age:17,emoji:"👩🏽",race:"Hispanic",gender:"Woman",socio:"Low income",region:"Urban (major city)",city:"New York, NY",
   decision:"Apply to college as a DACA recipient vs. work to support her family immediately",
   context:"Sofia was brought from Mexico at age 3. She's a DACA recipient and a straight-A student. Her parents work two jobs each.",
   bestCase:{label:"She applies to college and wins scholarships specifically for DACA students",outcomes:[{icon:"💰",text:"NYC has strong scholarship programs for DACA students — full funding is possible with the right guidance"},{icon:"🏥",text:"College counseling and peer community dramatically reduces immigrant teen anxiety and isolation"},{icon:"💞",text:"Family pride in her achievement becomes a generational turning point"},{icon:"⚖️",text:"DACA renewal + college degree = stronger foundation for future immigration pathways"}],stat:"DACA recipients who complete college are 90% more likely to stay off public assistance"},
   worstCase:{label:"She drops out and enters the informal workforce",outcomes:[{icon:"💰",text:"Without a degree, DACA recipients average $15–18/hr with no benefits in NYC"},{icon:"🏥",text:"Undocumented workers avoid healthcare due to fear — one emergency creates debt she can't discharge"},{icon:"💞",text:"Putting family finances on her shoulders at 17 creates long-term emotional burden"},{icon:"⚖️",text:"Informal work exposes her to wage theft and labor violations with little legal recourse"}],stat:"First-generation college graduates are 5x more likely to lift their entire family out of poverty within 10 years"}},
  {name:"Diego",age:18,emoji:"👨🏽",race:"Hispanic",gender:"Man",socio:"Working class",region:"Urban (major city)",city:"Miami, FL",
   decision:"Stay in the US for college vs. accept a full scholarship at a university in his family's home country",
   context:"Diego's parents immigrated from Colombia. US college is unaffordable even with aid. His uncle's university in Bogotá has offered a full engineering scholarship.",
   bestCase:{label:"He takes the scholarship, graduates debt-free, and returns to the US with a degree",outcomes:[{icon:"💰",text:"Graduates debt-free with an engineering degree — $0 loans vs. avg $37K US student debt"},{icon:"🏥",text:"Colombian university healthcare is fully covered — no medical debt risk during studies"},{icon:"💞",text:"Reconnects with extended family roots — strengthens identity and sense of belonging"},{icon:"⚖️",text:"US citizen studying abroad retains all citizenship rights — returns with full work authorization"}],stat:"International engineering graduates who return to the US earn the same as domestic grads within 3 years — with zero debt"},
   worstCase:{label:"He stays, takes loans, and struggles without full family or cultural support",outcomes:[{icon:"💰",text:"$37K average student debt — first-gen Latino men default at 2x the rate of white peers"},{icon:"🏥",text:"Financial stress is the #1 cause of dropout among first-generation Latino men"},{icon:"💞",text:"Distance from culture without community buffer — isolation is a real academic risk"},{icon:"⚖️",text:"Student debt follows him for 20+ years — limits homeownership and family formation"}],stat:"Only 16% of first-gen Latino men complete a 4-year degree within 6 years — but 58% complete with full financial support"}},
  {name:"Zoe",age:16,emoji:"👩🏻",race:"White",gender:"Woman",socio:"Middle class",region:"Rural",city:"Rural Tennessee",
   decision:"Come out to her family now vs. wait until she is financially independent",
   context:"Zoe knows she is gay. Her family is deeply religious and conservative. She has 2 years of high school left and depends entirely on her parents financially.",
   bestCase:{label:"She builds a support network first and times her disclosure carefully",outcomes:[{icon:"💰",text:"Teens who come out with support networks in place are 40% less likely to experience housing instability"},{icon:"🏥",text:"Living authentically reduces depression by up to 50% — staying closeted long-term causes serious mental health deterioration"},{icon:"💞",text:"The right counselor or trusted adult can mediate family conversations — many religious families come around over time"},{icon:"⚖️",text:"LGBTQ+ youth organizations can help her build a legal safety net before disclosure"}],stat:"LGBTQ+ youth with at least ONE supportive adult are 40% less likely to attempt suicide"},
   worstCase:{label:"She comes out without support and faces family rejection",outcomes:[{icon:"💰",text:"40% of homeless youth identify as LGBTQ+ — family rejection is the primary cause"},{icon:"🏥",text:"LGBTQ+ youth rejected by family are 8x more likely to attempt suicide — the single most critical risk factor"},{icon:"💞",text:"Forced or premature disclosure without support can permanently damage relationships that might otherwise heal"},{icon:"⚖️",text:"As a minor in a conservative state, she has limited legal recourse if family controls her housing, school, or healthcare"}],stat:"Accepted LGBTQ+ youth are 3x more likely to graduate high school and 5x more likely to report high life satisfaction at 25"}},
  {name:"Andre",age:18,emoji:"👨🏿",race:"Black",gender:"Man",socio:"Working class",region:"Urban (major city)",city:"Atlanta, GA",
   decision:"Come out as gay in a community where it may cost him church, family, and career connections",
   context:"Andre just graduated high school and is deeply embedded in a Black church community in Atlanta where his family has deep roots.",
   bestCase:{label:"He builds a chosen family of affirming community before coming out",outcomes:[{icon:"💰",text:"Atlanta has one of the strongest Black LGBTQ+ professional networks in the US — opportunity exists"},{icon:"🏥",text:"Living openly with community support dramatically reduces elevated depression and hypertension rates in Black gay men"},{icon:"💞",text:"Many Black families, even religious ones, ultimately prioritize love — 60% of initially rejecting parents come around within 3 years"},{icon:"⚖️",text:"Knowing his rights protects him in housing and employment in a state with limited LGBTQ+ protections"}],stat:"Black LGBTQ+ adults with affirming community are 4x more likely to report excellent mental health outcomes"},
   worstCase:{label:"He loses community and family support without a safety net",outcomes:[{icon:"💰",text:"Loss of church and family network means loss of job referrals, housing support, and social capital in one move"},{icon:"🏥",text:"Black gay men face the highest rates of depression and anxiety of any demographic — isolation dramatically worsens this"},{icon:"💞",text:"Church and community are often the primary mental health infrastructure for Black families — losing both is devastating"},{icon:"⚖️",text:"Without family support he is more vulnerable to housing instability and workplace discrimination"}],stat:"Black LGBTQ+ youth who lose family support are 3x more likely to experience homelessness within 12 months"}},
  {name:"Destiny",age:18,emoji:"👩🏾",race:"Black",gender:"Woman",socio:"Low income",region:"Urban (major city)",city:"Detroit, MI",
   decision:"Age out of foster care at 18 vs. apply for Michigan's extended care program until age 21",
   context:"Destiny turns 18 in two months. She has a GED and a part-time pharmacy job. No family. Her caseworker mentioned extended foster care but made it sound optional.",
   bestCase:{label:"She enrolls in extended care AND uses every transitional resource available",outcomes:[{icon:"💰",text:"Michigan extended care: housing + $600/month stipend until 21, plus free tuition at any state community college"},{icon:"🏥",text:"Medicaid coverage until age 26 under extended care — one of the most valuable benefits for young adults without family"},{icon:"💞",text:"Transitional programs connect her with mentors and peer community — the chosen family that reduces isolation dramatically"},{icon:"⚖️",text:"Extended care gives her time to build credit, understand tenant rights, and avoid predatory leases"}],stat:"Foster youth who use extended care have 3x higher college enrollment and 50% lower homelessness rates"},
   worstCase:{label:"She ages out without using extended benefits, chasing independence too fast",outcomes:[{icon:"💰",text:"Over 50% of youth who age out experience homelessness within 2 years — the first year is the most dangerous"},{icon:"🏥",text:"Former foster youth without support have the highest rates of untreated mental health conditions of any demographic"},{icon:"💞",text:"Without family or community, loneliness becomes the dominant experience — amplifying every other risk"},{icon:"⚖️",text:"Unaware of her rights, she is vulnerable to illegal evictions, wage theft, and benefit gaps that are hard to recover from"}],stat:"By age 26, only 3% of foster care alumni have completed a college degree — extended care doubles that rate"}},
  {name:"Tyler",age:17,emoji:"👦🏼",race:"White",gender:"Man",socio:"Low income",region:"Suburban",city:"Phoenix, AZ",
   decision:"Move in with his biological father just released from prison vs. stay in the group home one more year",
   context:"Tyler has been in foster care since age 9. His father just completed a 5-year sentence and wants a relationship.",
   bestCase:{label:"He builds a relationship with his father slowly while staying in stable housing",outcomes:[{icon:"💰",text:"Maintaining stable housing through 18 gives him access to Arizona's extended foster care benefits and free community college"},{icon:"🏥",text:"Gradual family reunion with counseling support has 60% positive outcomes — rushed reunion has less than 30%"},{icon:"💞",text:"A father who earns trust over time is infinitely more valuable than one who feels obligated under one roof"},{icon:"⚖️",text:"Staying in care keeps his caseworker, advocate, and legal protections in place through the vulnerable transition period"}],stat:"Youth who maintain stable housing through age 18 are 2x more likely to complete education and avoid incarceration"},
   worstCase:{label:"He moves in immediately out of hope and the home becomes unstable",outcomes:[{icon:"💰",text:"If the placement fails, re-entering foster care at 17 is extremely difficult — he risks being legally homeless at 18"},{icon:"🏥",text:"Retraumatization from a failed reunion is one of the most damaging experiences for foster youth"},{icon:"💞",text:"A failed reunion can permanently damage a relationship that might have thrived with slower development"},{icon:"⚖️",text:"Living with a parent on parole can create unintended legal complications under parole conditions"}],stat:"65% of rapid post-incarceration family reunifications with minors disrupt within 12 months — with lasting harm"}},
  {name:"Aaliyah",age:18,emoji:"👩🏾‍🦱",race:"Black",gender:"Woman",socio:"Working class",region:"Urban (major city)",city:"Houston, TX",
   decision:"Accept her full Division I volleyball scholarship vs. pursue her dream of studying pre-medicine",
   context:"Aaliyah has a full athletic scholarship to a Division I program. She is quietly burning out and secretly wants to study medicine.",
   bestCase:{label:"She has an honest conversation with her coach and negotiates an academic-athletic balance",outcomes:[{icon:"💰",text:"A full scholarship IS pre-med funding — many Division I athletes successfully complete pre-med"},{icon:"🏥",text:"Athletes who pursue both passion and academics report significantly better mental health than those who suppress one"},{icon:"💞",text:"Honest communication with family builds trust — her parents want her success, not just her sacrifice"},{icon:"⚖️",text:"NCAA rules allow academic flexibility she may not know she has"}],stat:"Black women who complete STEM degrees earn 40% more over their lifetime than any other path"},
   worstCase:{label:"She accepts without honesty, burns out, loses the scholarship, and has neither path",outcomes:[{icon:"💰",text:"If she burns out and loses the scholarship, she loses $200K+ in funding with no backup plan"},{icon:"🏥",text:"Athletic burnout combined with suppressed career dreams is a documented path to depression in young Black women"},{icon:"💞",text:"Silently sacrificing for family creates resentment that damages relationships more than an honest conversation ever would"},{icon:"⚖️",text:"Injury during a sport she doesn't love, without academic planning, leaves her with neither career nor compensation"}],stat:"Less than 2% of college athletes go pro — but 100% of them can apply to medical school"}},
  {name:"Jaylen",age:17,emoji:"👦🏿",race:"Black",gender:"Man",socio:"Low income",region:"Urban (major city)",city:"Chicago, IL",
   decision:"Pursue professional soccer after high school vs. accept his full college scholarship offer",
   context:"Jaylen has been scouted by an MLS development team. He also has a full academic scholarship to a Division II school.",
   bestCase:{label:"He goes to college, dominates the game, and enters the MLS Draft in 4 years",outcomes:[{icon:"💰",text:"College soccer players who enter the MLS Draft have 3x the contract negotiating power of direct youth recruits"},{icon:"🏥",text:"4 more years of physical development make him a stronger, less injury-prone professional athlete"},{icon:"💞",text:"College gives him a backup degree and a life identity beyond the sport — crucial for the 98% who don't sustain pro careers"},{icon:"⚖️",text:"Scholarship protects his family financially while he develops — going direct means giving up guaranteed education"}],stat:"NCAA college soccer players who enter MLS earn 40% higher starting contracts than direct youth development signings"},
   worstCase:{label:"He signs with the development team, gets injured, and has no degree and no pro career",outcomes:[{icon:"💰",text:"MLS development contracts average $18–25K/year — below poverty line. 78% of players never make the first team roster"},{icon:"🏥",text:"Lower-level players receive minimal medical support — one serious injury can end a career with no institutional backing"},{icon:"💞",text:"Family financial pressure multiplies if he isn't producing income — the 'great hope' narrative becomes a weight he can't carry"},{icon:"⚖️",text:"Signing as a minor requires parental consent and legal review — many young athletes sign unfavorable contracts"}],stat:"The average professional soccer career lasts 8 years — but only 1.7% of high school players ever play professionally at any level"}},
];

// ── SHADOW SELF SPANISH TRANSLATIONS ─────────────────────────────────────────
const SHADOW_TRANSLATIONS={
  Aisha:{
    decision:"Abandonar la escuela secundaria para trabajar a tiempo completo",
    context:"Su familia necesita ingresos ahora. Está considerando dejar la escuela para tomar un trabajo de venta al por menor a tiempo completo que paga $14/hora.",
    bestCase:{
      label:"Obtiene su GED + se inscribe en un colegio comunitario",
      outcomes:[
        {icon:"💰",text:"Gana $42K a los 25 con un título de asociado — 55% más que quedarse en ventas"},
        {icon:"🏥",text:"Califica para seguro médico del empleador a través de un trabajo administrativo de salud"},
        {icon:"💞",text:"Construye una base estable — el estrés financiero se reduce, la salud en relaciones mejora"},
        {icon:"⚖️",text:"Historial limpio, red profesional en crecimiento, trayectoria de movilidad ascendente"},
      ],
      stat:"Las mujeres negras con títulos de asociado ganan 61% más durante su vida que las que no tienen",
    },
    worstCase:{
      label:"Se queda en ventas sin credencial",
      outcomes:[
        {icon:"💰",text:"Sigue ganando $15–17/hora a los 25 — por debajo del salario digno en Chicago"},
        {icon:"🏥",text:"72% de probabilidad de no tener seguro — una emergencia puede generar deudas graves"},
        {icon:"💞",text:"La inestabilidad financiera es el mayor generador de estrés en las relaciones"},
        {icon:"⚖️",text:"La precariedad económica aumenta el riesgo de contacto con el sistema legal"},
      ],
      stat:"Los que abandonan la escuela ganan $400K menos en su vida — la brecha crece cada año",
    },
  },
  Carlos:{
    decision:"Iniciar un negocio en lugar de ir a la universidad",
    context:"Tiene un negocio secundario de jardinería que le genera $800/mes. Quiere trabajarlo a tiempo completo y saltarse la universidad.",
    bestCase:{
      label:"Formaliza el negocio + toma mentoría gratuita de la SBA",
      outcomes:[
        {icon:"💰",text:"Crece a $65K en ingresos a los 25 con 2 empleados — igual que el ingreso mediano de graduados"},
        {icon:"🏥",text:"Se une a una cooperativa de salud para dueños de negocios — cobertura por ~$180/mes"},
        {icon:"💞",text:"La propiedad del negocio crea orgullo y estabilidad — alta satisfacción en relaciones"},
        {icon:"⚖️",text:"La estructura de LLC protege los bienes personales — registros fiscales limpios desde el principio"},
      ],
      stat:"Los negocios hispanos están entre los de mayor crecimiento en EE.UU. — el mercado existe",
    },
    worstCase:{
      label:"Lo lleva de manera informal sin estructura ni plan",
      outcomes:[
        {icon:"💰",text:"El negocio fracasa en 3 años (82% lo hacen sin un plan) — de vuelta a cero sin título"},
        {icon:"🏥",text:"Sin seguro por más de 4 años — costo promedio de una visita a urgencias: $2,200"},
        {icon:"💞",text:"62% de los fundadores reportan tensión grave en relaciones durante los primeros 1–3 años"},
        {icon:"⚖️",text:"Las multas del IRS por ingresos no declarados promedian $1,200 — común de perder"},
      ],
      stat:"El 80% de los negocios que fracasan citan la falta de planificación como causa principal",
    },
  },
  Madison:{
    decision:"Casarse a los 20 años y formar una familia",
    context:"Lleva 2 años con su pareja. Están hablando de saltarse la universidad y comenzar su vida juntos ahora.",
    bestCase:{
      label:"Toman consejería prematrimonial + construyen base financiera primero",
      outcomes:[
        {icon:"💰",text:"Ambos trabajando a los 22 con presupuesto claro — ingresos del hogar $68K, encaminados a casa propia a los 27"},
        {icon:"🏥",text:"El matrimonio estable es uno de los mejores predictores de salud física y mental a largo plazo"},
        {icon:"💞",text:"Las parejas con metas financieras compartidas tienen 40% menos conflictos y divorcios"},
        {icon:"⚖️",text:"Bajo riesgo legal — testamentos y documentos básicos establecidos temprano protegen a ambos"},
      ],
      stat:"Las parejas que completan educación prematrimonial reportan 30% más satisfacción en la relación",
    },
    worstCase:{
      label:"Se casan rápido sin base financiera ni de comunicación",
      outcomes:[
        {icon:"💰",text:"El 45% de los matrimonios menores de 25 en áreas rurales terminan en divorcio — costo promedio: $15,000"},
        {icon:"🏥",text:"Un matrimonio infeliz es clínicamente peor para la salud mental que estar soltero — la depresión se duplica"},
        {icon:"💞",text:"Primer hijo en el año 1 + estrés financiero = principal predictor de separación temprana"},
        {icon:"⚖️",text:"La custodia en áreas rurales a menudo requiere ayuda legal costosa con acceso limitado"},
      ],
      stat:"Las mujeres que se divorcian antes de los 25 tardan un promedio de 5 años en recuperarse económicamente",
    },
  },
  James:{
    decision:"Alistarse en el Ejército después de la escuela secundaria",
    context:"Hay pocos empleos cerca de casa. Ve el ejército como una salida y un camino hacia la estabilidad.",
    bestCase:{
      label:"Se alista, usa el GI Bill y planifica su salida desde el primer día",
      outcomes:[
        {icon:"💰",text:"$38K de salario + vivienda gratuita + atención médica desde el primer día. El GI Bill cubre un título de 4 años"},
        {icon:"🏥",text:"Atención médica completa del VA de por vida — uno de los beneficios más fuertes disponibles"},
        {icon:"💞",text:"La comunidad militar proporciona estructura y pertenencia — fuerte apoyo en la transición si se usa"},
        {icon:"⚖️",text:"Las protecciones SCRA congelan los intereses de las deudas durante el servicio — salvaguarda poderosa"},
      ],
      stat:"Los veteranos que usan el GI Bill tienen ganancias de por vida 40% mayores que sus pares sin universidad",
    },
    worstCase:{
      label:"Se alista sin conocer los apoyos y lucha en la transición",
      outcomes:[
        {icon:"💰",text:"Los veteranos sin plan universitario suelen volver a trabajos de bajo salario — el GI Bill no es usado por el 40%"},
        {icon:"🏥",text:"El PTSD afecta al 20% de los veteranos de combate — los veteranos indígenas son los menos propensos a buscar ayuda"},
        {icon:"💞",text:"La tasa de divorcios militares es 15% mayor que la civil — el despliegue tensiona a las familias"},
        {icon:"⚖️",text:"Los veteranos indígenas enfrentan barreras desproporcionadas para acceder a los beneficios del VA"},
      ],
      stat:"Los veteranos indígenas son los más condecorados per cápita — y los más desatendidos por el sistema VA",
    },
  },
  Priya:{
    decision:"Tomarse un año sabático antes de comenzar su carrera",
    context:"Recién se graduó de la universidad. Tiene una oferta de trabajo pero se siente agotada. Piensa en pasar un año viajando y siendo voluntaria.",
    bestCase:{
      label:"Aplaza la oferta de trabajo + hace un programa estructurado de año sabático",
      outcomes:[
        {icon:"💰",text:"Regresa renovada — los graduados con año sabático ganan 8% más en 5 años"},
        {icon:"🏥",text:"El 88% de los alumni de año sabático reportan mejoras significativas en salud mental y propósito"},
        {icon:"💞",text:"La autoconciencia adquirida lleva a relaciones más sanas — sabe lo que realmente quiere"},
        {icon:"⚖️",text:"Sin riesgo legal — AmeriCorps y programas estructurados brindan apoyo legal en el extranjero"},
      ],
      stat:"El 90% de los empleadores ven el año sabático favorablemente — es un diferenciador, no un vacío",
    },
    worstCase:{
      label:"Renuncia sin un plan y deriva durante un año",
      outcomes:[
        {icon:"💰",text:"Pierde la oferta de trabajo — reincorporarse al mercado laboral de NYC toma entre 8 y 14 meses"},
        {icon:"🏥",text:"El tiempo no estructurado sin propósito puede empeorar la ansiedad — el riesgo de aislamiento es real"},
        {icon:"💞",text:"La dependencia financiera de la familia tensiona esas relaciones — la culpa y la presión aumentan"},
        {icon:"⚖️",text:"Quedarse más tiempo del visa permitido o trabajar ilegalmente crea complicaciones migratorias"},
      ],
      stat:"La diferencia entre un buen y un mal año sabático se basa casi completamente en la estructura y la intención",
    },
  },
  Jordan:{
    decision:"Dedicarse a tiempo completo a la economía gig en lugar de buscar un título o oficio",
    context:"Gana $1,200/mes manejando para Uber y haciendo trabajos en TaskRabbit. Se siente libre y quieren hacerlo su carrera.",
    bestCase:{
      label:"Usan el trabajo gig como trampolín + construyen un nicho freelance especializado",
      outcomes:[
        {icon:"💰",text:"Desarrollan una especialidad — ingresos freelance alcanzan $55K a los 25"},
        {icon:"🏥",text:"Califica para subsidios ACA — obtiene cobertura médica por menos de $100/mes"},
        {icon:"💞",text:"La flexibilidad les permite estar presentes para su comunidad — alta calidad de vida con ingresos estables"},
        {icon:"⚖️",text:"Formación de LLC + declaración de impuestos trimestral los mantiene protegidos legalmente"},
      ],
      stat:"Los freelancers especializados ganan 3 veces más que los trabajadores gig generales en 3 años",
    },
    worstCase:{
      label:"Se quedan en trabajo gig de baja habilidad sin plan de crecimiento",
      outcomes:[
        {icon:"💰",text:"Ingreso mediano de $32K anuales — por debajo del salario digno en la mayoría de ciudades de EE.UU."},
        {icon:"🏥",text:"El 78% de los trabajadores gig no binarios no tienen seguro — la tasa más alta de cualquier grupo"},
        {icon:"💞",text:"La inestabilidad de ingresos es el principal predictor de ruptura de relaciones"},
        {icon:"⚖️",text:"Las multas acumuladas del IRS por impuestos no presentados promedian $3,400 — muy común"},
      ],
      stat:"Los trabajadores no binarios enfrentan una brecha salarial del 32% vs. sus pares cisgénero — el trabajo gig la amplifica",
    },
  },
  Sofia:{
    decision:"Solicitar ingreso a la universidad como receptora de DACA vs. trabajar para apoyar a su familia inmediatamente",
    context:"Sofía fue traída de México a los 3 años. Es receptora de DACA y estudiante de excelencia. Sus padres trabajan en dos empleos cada uno.",
    bestCase:{
      label:"Solicita becas específicas para estudiantes DACA y las obtiene",
      outcomes:[
        {icon:"💰",text:"NYC tiene fuertes programas de becas para estudiantes DACA — el financiamiento completo es posible"},
        {icon:"🏥",text:"La orientación universitaria reduce drásticamente la ansiedad y el aislamiento de los adolescentes inmigrantes"},
        {icon:"💞",text:"El orgullo familiar en su logro se convierte en un punto de inflexión generacional"},
        {icon:"⚖️",text:"La renovación de DACA + título universitario = base más sólida para futuros caminos migratorios"},
      ],
      stat:"Los receptores de DACA que terminan la universidad tienen 90% más probabilidades de no depender de asistencia pública",
    },
    worstCase:{
      label:"Abandona la escuela y entra al mercado laboral informal",
      outcomes:[
        {icon:"💰",text:"Sin título, los receptores de DACA promedian $15–18/hora sin beneficios en NYC"},
        {icon:"🏥",text:"Los trabajadores indocumentados evitan la atención médica por miedo — una emergencia crea deudas impagables"},
        {icon:"💞",text:"Cargar las finanzas familiares a sus 17 años crea una carga emocional a largo plazo"},
        {icon:"⚖️",text:"El trabajo informal la expone al robo de salarios y violaciones laborales con poco recurso legal"},
      ],
      stat:"Los graduados universitarios de primera generación tienen 5 veces más probabilidades de sacar a su familia de la pobreza",
    },
  },
  Diego:{
    decision:"Quedarse en EE.UU. para la universidad vs. aceptar una beca completa en la universidad del país de origen de su familia",
    context:"Los padres de Diego inmigraron de Colombia. La universidad en EE.UU. es inasequible incluso con ayuda. La universidad de su tío en Bogotá le ofreció una beca completa de ingeniería.",
    bestCase:{
      label:"Toma la beca, se gradúa sin deudas y regresa a EE.UU. con un título",
      outcomes:[
        {icon:"💰",text:"Se gradúa sin deudas con un título de ingeniería — $0 en préstamos vs. $37K promedio de deuda estudiantil"},
        {icon:"🏥",text:"La atención médica universitaria colombiana está totalmente cubierta — sin riesgo de deuda médica"},
        {icon:"💞",text:"Reconecta con sus raíces familiares extendidas — fortalece la identidad y el sentido de pertenencia"},
        {icon:"⚖️",text:"El ciudadano estadounidense que estudia en el extranjero conserva todos los derechos — regresa con autorización de trabajo completa"},
      ],
      stat:"Los graduados internacionales de ingeniería que regresan a EE.UU. ganan lo mismo que los locales — sin deudas",
    },
    worstCase:{
      label:"Se queda, toma préstamos y lucha sin apoyo familiar ni cultural completo",
      outcomes:[
        {icon:"💰",text:"$37K de deuda estudiantil promedio — los hombres latinos de primera generación incumplen pagos al doble de la tasa"},
        {icon:"🏥",text:"El estrés financiero es la principal causa de abandono entre los hombres latinos de primera generación"},
        {icon:"💞",text:"Distancia de la cultura sin el amortiguador comunitario — el aislamiento es un riesgo académico real"},
        {icon:"⚖️",text:"La deuda estudiantil lo acompaña más de 20 años — limita la propiedad de vivienda y la formación familiar"},
      ],
      stat:"Solo el 16% de los hombres latinos de primera generación completan un título de 4 años en 6 años",
    },
  },
  Zoe:{
    decision:"Salir del clóset con su familia ahora vs. esperar hasta ser económicamente independiente",
    context:"Zoe sabe que es gay. Su familia es profundamente religiosa y conservadora. Le quedan 2 años de escuela secundaria y depende económicamente de sus padres.",
    bestCase:{
      label:"Construye una red de apoyo primero y elige el momento de su revelación con cuidado",
      outcomes:[
        {icon:"💰",text:"Los adolescentes que salen del clóset con redes de apoyo tienen 40% menos probabilidades de inestabilidad habitacional"},
        {icon:"🏥",text:"Vivir auténticamente reduce la depresión hasta en un 50% — mantenerse en el clóset deteriora la salud mental"},
        {icon:"💞",text:"El consejero o adulto de confianza adecuado puede mediar conversaciones familiares — muchas familias cambian con el tiempo"},
        {icon:"⚖️",text:"Las organizaciones LGBTQ+ pueden ayudarla a construir una red de seguridad legal antes de la revelación"},
      ],
      stat:"Los jóvenes LGBTQ+ con al menos UN adulto de apoyo tienen 40% menos probabilidades de intentar suicidarse",
    },
    worstCase:{
      label:"Sale del clóset sin apoyo y enfrenta el rechazo familiar",
      outcomes:[
        {icon:"💰",text:"El 40% de los jóvenes sin hogar se identifican como LGBTQ+ — el rechazo familiar es la causa principal"},
        {icon:"🏥",text:"Los jóvenes LGBTQ+ rechazados por su familia tienen 8 veces más probabilidades de intentar suicidarse"},
        {icon:"💞",text:"La revelación forzada sin apoyo puede dañar permanentemente relaciones que podrían haber sanado"},
        {icon:"⚖️",text:"Como menor en un estado conservador, tiene recursos legales limitados si la familia controla su vivienda"},
      ],
      stat:"Los jóvenes LGBTQ+ aceptados tienen 3 veces más probabilidades de graduarse y 5 veces más de reportar alta satisfacción a los 25",
    },
  },
  Andre:{
    decision:"Salir del clóset como gay en una comunidad donde puede costarle la iglesia, la familia y las conexiones profesionales",
    context:"Andre acaba de graduarse de la escuela secundaria y está profundamente arraigado en una comunidad de iglesia negra en Atlanta donde su familia tiene raíces profundas.",
    bestCase:{
      label:"Construye una familia elegida de comunidad afirmativa antes de salir del clóset",
      outcomes:[
        {icon:"💰",text:"Atlanta tiene una de las redes profesionales negras LGBTQ+ más fuertes de EE.UU. — la oportunidad existe"},
        {icon:"🏥",text:"Vivir abiertamente con apoyo comunitario reduce drásticamente las tasas de depresión e hipertensión"},
        {icon:"💞",text:"Muchas familias negras, incluso religiosas, priorizan el amor — el 60% de los padres que rechazan inicialmente cambian en 3 años"},
        {icon:"⚖️",text:"Conocer sus derechos lo protege en vivienda y empleo en un estado con pocas protecciones LGBTQ+"},
      ],
      stat:"Los adultos negros LGBTQ+ con comunidad afirmativa tienen 4 veces más probabilidades de reportar excelente salud mental",
    },
    worstCase:{
      label:"Pierde el apoyo de la comunidad y la familia sin una red de seguridad",
      outcomes:[
        {icon:"💰",text:"Perder la red de la iglesia y la familia significa perder referencias de trabajo, apoyo habitacional y capital social"},
        {icon:"🏥",text:"Los hombres gay negros enfrentan las tasas más altas de depresión y ansiedad de cualquier grupo — el aislamiento lo empeora"},
        {icon:"💞",text:"La iglesia y la comunidad son a menudo la infraestructura principal de salud mental para las familias negras"},
        {icon:"⚖️",text:"Sin apoyo familiar es más vulnerable a la inestabilidad habitacional y la discriminación laboral"},
      ],
      stat:"Los jóvenes negros LGBTQ+ que pierden el apoyo familiar tienen 3 veces más probabilidades de experimentar falta de hogar",
    },
  },
  Destiny:{
    decision:"Salir del sistema de cuidado de crianza a los 18 vs. solicitar el programa de cuidado extendido de Michigan hasta los 21",
    context:"Destiny cumple 18 años en dos meses. Tiene su GED y un trabajo a tiempo parcial en una farmacia. Sin familia. Su trabajador social mencionó el cuidado de crianza extendido pero lo hizo sonar opcional.",
    bestCase:{
      label:"Se inscribe en el cuidado extendido Y usa cada recurso de transición disponible",
      outcomes:[
        {icon:"💰",text:"Cuidado extendido de Michigan: vivienda + $600/mes de estipendio hasta los 21, más matrícula gratuita en colegios comunitarios"},
        {icon:"🏥",text:"Cobertura de Medicaid hasta los 26 — uno de los beneficios más valiosos para adultos jóvenes sin familia"},
        {icon:"💞",text:"Los programas de transición la conectan con mentores y comunidad de pares — la familia elegida que reduce el aislamiento"},
        {icon:"⚖️",text:"El cuidado extendido le da tiempo para construir crédito, entender derechos de inquilinos y evitar contratos abusivos"},
      ],
      stat:"Los jóvenes de acogida que usan el cuidado extendido tienen 3 veces mayor inscripción universitaria y 50% menos de falta de hogar",
    },
    worstCase:{
      label:"Sale del sistema sin usar los beneficios extendidos, buscando independencia demasiado rápido",
      outcomes:[
        {icon:"💰",text:"Más del 50% de los jóvenes que salen del sistema experimentan falta de hogar en 2 años — el primer año es el más peligroso"},
        {icon:"🏥",text:"Los ex jóvenes de acogida sin apoyo tienen las tasas más altas de condiciones de salud mental no tratadas"},
        {icon:"💞",text:"Sin familia ni comunidad, la soledad se convierte en la experiencia dominante — amplificando cada otro riesgo"},
        {icon:"⚖️",text:"Sin conocer sus derechos, es vulnerable a desalojos ilegales, robo de salarios y brechas de beneficios"},
      ],
      stat:"A los 26 años, solo el 3% de los ex jóvenes de acogida han completado un título universitario — el cuidado extendido duplica esa tasa",
    },
  },
  Tyler:{
    decision:"Mudarse con su padre biológico recién liberado de prisión vs. quedarse en el hogar grupal un año más",
    context:"Tyler ha estado en el sistema de cuidado de crianza desde los 9 años. Su padre acaba de cumplir una condena de 5 años y quiere una relación. El hogar grupal es estable pero solitario.",
    bestCase:{
      label:"Construye una relación con su padre lentamente mientras mantiene una vivienda estable",
      outcomes:[
        {icon:"💰",text:"Mantener una vivienda estable hasta los 18 le da acceso a los beneficios de cuidado extendido de Arizona y colegio comunitario gratuito"},
        {icon:"🏥",text:"La reunificación familiar gradual con apoyo de consejería tiene un 60% de resultados positivos — la apresurada menos del 30%"},
        {icon:"💞",text:"Un padre que gana confianza con el tiempo es infinitamente más valioso que uno bajo la misma presión del mismo techo"},
        {icon:"⚖️",text:"Quedarse en el cuidado mantiene a su trabajador social, defensor y protecciones legales durante la transición vulnerable"},
      ],
      stat:"Los jóvenes que mantienen vivienda estable hasta los 18 tienen 2 veces más probabilidades de completar la educación",
    },
    worstCase:{
      label:"Se muda de inmediato por esperanza y el hogar se vuelve inestable",
      outcomes:[
        {icon:"💰",text:"Si la colocación falla, reintegrarse al sistema de crianza a los 17 es extremadamente difícil — riesga quedar sin hogar a los 18"},
        {icon:"🏥",text:"La retraumatización por una reunión fallida es una de las experiencias más dañinas para los jóvenes de crianza"},
        {icon:"💞",text:"Una reunión fallida puede dañar permanentemente una relación que podría haber prosperado con un desarrollo más lento"},
        {icon:"⚖️",text:"Vivir con un padre en libertad condicional puede crear complicaciones legales no deseadas"},
      ],
      stat:"El 65% de las reunificaciones familiares post-encarcelamiento rápidas con menores se interrumpen en 12 meses",
    },
  },
  Aaliyah:{
    decision:"Aceptar su beca completa de voleibol División I vs. perseguir su sueño de estudiar pre-medicina",
    context:"Aaliyah tiene una beca atlética completa en un programa División I. Está agotándose silenciosamente y en secreto quiere estudiar medicina.",
    bestCase:{
      label:"Tiene una conversación honesta con su entrenador y negocia un equilibrio académico-atlético",
      outcomes:[
        {icon:"💰",text:"Una beca completa ES financiamiento para pre-medicina — muchos atletas División I completan pre-medicina exitosamente"},
        {icon:"🏥",text:"Los atletas que persiguen tanto la pasión como los estudios reportan significativamente mejor salud mental"},
        {icon:"💞",text:"La comunicación honesta con la familia construye confianza — sus padres quieren su éxito, no solo su sacrificio"},
        {icon:"⚖️",text:"Las reglas de la NCAA permiten flexibilidad académica que ella puede no conocer"},
      ],
      stat:"Las mujeres negras que completan títulos STEM ganan 40% más a lo largo de su vida que cualquier otro camino",
    },
    worstCase:{
      label:"Acepta sin honestidad, se agota, pierde la beca y no tiene ninguno de los dos caminos",
      outcomes:[
        {icon:"💰",text:"Si se agota y pierde la beca, pierde más de $200K en financiamiento sin plan alternativo"},
        {icon:"🏥",text:"El agotamiento atlético combinado con sueños suprimidos es un camino documentado hacia la depresión en mujeres negras jóvenes"},
        {icon:"💞",text:"Sacrificarse en silencio por la familia crea resentimiento que daña las relaciones más que una conversación honesta"},
        {icon:"⚖️",text:"Una lesión en un deporte que no ama, sin planificación académica, la deja sin carrera ni compensación"},
      ],
      stat:"Menos del 2% de los atletas universitarios llegan a ser profesionales — pero el 100% puede solicitar a la escuela de medicina",
    },
  },
  Jaylen:{
    decision:"Perseguir el fútbol profesional después de la escuela secundaria vs. aceptar su beca universitaria completa",
    context:"Jaylen ha sido reclutado por un equipo de desarrollo de la MLS. También tiene una beca académica completa para una escuela División II.",
    bestCase:{
      label:"Va a la universidad, domina el juego y entra al Draft de la MLS en 4 años",
      outcomes:[
        {icon:"💰",text:"Los jugadores universitarios que entran al Draft de la MLS tienen 3 veces el poder de negociación de contratos"},
        {icon:"🏥",text:"4 años más de desarrollo físico lo hacen un atleta profesional más fuerte y menos propenso a lesiones"},
        {icon:"💞",text:"La universidad le da un título de respaldo y una identidad más allá del deporte — crucial para el 98% que no sostienen carreras pro"},
        {icon:"⚖️",text:"La beca protege financieramente a su familia mientras se desarrolla — ir directo significa renunciar a educación garantizada"},
      ],
      stat:"Los jugadores universitarios de fútbol que entran a la MLS ganan contratos iniciales 40% mayores que los reclutas de desarrollo juvenil",
    },
    worstCase:{
      label:"Firma con el equipo de desarrollo, se lesiona y no tiene título ni carrera profesional",
      outcomes:[
        {icon:"💰",text:"Los contratos de desarrollo de la MLS promedian $18–25K/año — por debajo del umbral de pobreza. El 78% nunca llega al equipo principal"},
        {icon:"🏥",text:"Los jugadores de nivel inferior reciben apoyo médico mínimo — una lesión grave puede acabar la carrera sin respaldo institucional"},
        {icon:"💞",text:"La presión financiera familiar se multiplica si no genera ingresos — la narrativa de la gran esperanza se vuelve un peso"},
        {icon:"⚖️",text:"Firmar como menor requiere consentimiento parental y revisión legal — muchos jóvenes firman contratos desfavorables"},
      ],
      stat:"La carrera profesional de fútbol promedio dura 8 años — pero solo el 1.7% de los jugadores de escuela secundaria llegan a ser profesionales",
    },
  },
};

// ── SCENARIOS ─────────────────────────────────────────────────────────────────
const SCENARIOS=[
  {id:"college",category:"education",icon:"🎓",riskScore:35,title:"4-Year College Degree",tagline:"Traditional university path",titleEs:"Carrera Universitaria de 4 Años",taglineEs:"Camino universitario tradicional",
   outcomes:{
     financial:{headline:"+$400K lifetime earnings vs. HS diploma",stat:"Median $1,248/wk vs $853/wk without degree",byRace:{"White":"$1,310/wk","Black":"$1,020/wk","Hispanic":"$1,050/wk","Asian":"$1,480/wk","Indigenous":"$890/wk","Multiracial / Other":"$1,080/wk"},byGender:{"Man":"$1,398/wk","Woman":"$1,066/wk","Non-binary / Gender non-conforming":"~$1,000/wk"}},
     health:{headline:"78% more likely to have employer health coverage",stat:"College grads live ~5 years longer on average",byRace:{"White":"87% insured","Black":"79%","Hispanic":"74%","Asian":"88%","Indigenous":"71%","Multiracial / Other":"78%"},byGender:{"Man":"81%","Woman":"76%","Non-binary / Gender non-conforming":"~68%"}},
     relationship:{headline:"65% marriage rate — 30% lower divorce rate",stat:"Financial stability strongly predicts relationship stability",byRace:{"White":"68% married","Black":"44%","Hispanic":"56%","Asian":"71%","Indigenous":"47%","Multiracial / Other":"55%"},byGender:{"Man":"67%","Woman":"63%","Non-binary / Gender non-conforming":"~42%"}},
     legal:{headline:"4x less likely to be incarcerated vs. non-graduates",stat:"Education is one of the strongest crime-prevention factors",byRace:{"White":"0.5%","Black":"3.1% (college significantly reduces this)","Hispanic":"1.3%","Asian":"0.3%","Indigenous":"1.8%","Multiracial / Other":"1.1%"},byGender:{"Man":"1.4%","Woman":"0.2%","Non-binary / Gender non-conforming":"~0.6%"}},
   },
   beatsOdds:["First-gen graduates match legacy peers in earnings within 10 years","FAFSA can unlock thousands in free grant money — most teens never apply","HBCUs offer strong professional networks and scholarship opportunities"],
   resources:[{emoji:"🎓",label:"Apply for FAFSA (Free Application for Federal Student Aid)",url:"https://studentaid.gov",desc:"Free money for college — grants, loans & work-study"},{emoji:"🏫",label:"College Scorecard",url:"https://collegescorecard.ed.gov",desc:"Compare colleges by cost, graduation rate & earnings"},{emoji:"💰",label:"Fastweb Scholarship Finder",url:"https://www.fastweb.com",desc:"Find scholarships that match your background"}],
   sources:["BLS 2023","Pew Research 2022","CDC","NCES"]},
  {id:"community_college",category:"education",icon:"📚",riskScore:22,title:"Community College",tagline:"2-year degree or transfer pathway",titleEs:"Colegio Comunitario",taglineEs:"Título de 2 años o ruta de transferencia",
   outcomes:{
     financial:{headline:"Avg $84K less debt than 4-year university",stat:"Associate degree earners avg $963/wk",byRace:{"White":"$990/wk","Black":"$870/wk","Hispanic":"$850/wk","Asian":"$1,010/wk","Indigenous":"$810/wk","Multiracial / Other":"$900/wk"},byGender:{"Man":"$1,020/wk","Woman":"$890/wk","Non-binary / Gender non-conforming":"~$840/wk"}},
     health:{headline:"65% have employer health coverage after graduation",stat:"Lower debt burden improves mental health outcomes",byRace:{"White":"70%","Black":"60%","Hispanic":"57%","Asian":"68%","Indigenous":"54%","Multiracial / Other":"62%"},byGender:{"Man":"67%","Woman":"63%","Non-binary / Gender non-conforming":"~58%"}},
     relationship:{headline:"More flexibility for family and community ties",stat:"Students more likely to stay near support networks",byRace:{"All groups":"Similar positive outcomes"},byGender:{"All groups":"Similar"}},
     legal:{headline:"Very low legal risk pathway",stat:"Accessible regardless of prior academic record",byRace:{"All groups":"Low risk"},byGender:{"All groups":"Very low"}},
   },
   beatsOdds:["Many 4-year universities have guaranteed transfer agreements with community colleges","Nursing, IT, and trades at CC offer 6-figure career paths","Zero-debt graduation is realistic with Pell Grants and part-time work"],
   resources:[{emoji:"🏫",label:"Find a Community College Near You",url:"https://www.aacc.nche.edu/college-finder",desc:"American Association of Community Colleges directory"},{emoji:"💵",label:"Apply for FAFSA",url:"https://studentaid.gov",desc:"Most CC students qualify for free Pell Grant money"}],
   sources:["AACC 2023","BLS","College Board"]},
  {id:"trade",category:"education",icon:"🔧",riskScore:28,title:"Trade / Vocational School",tagline:"Skilled trades, tech certs, coding bootcamps",titleEs:"Escuela Técnica / Vocacional",taglineEs:"Oficios, certificaciones técnicas, bootcamps de programación",
   outcomes:{
     financial:{headline:"$60K+ starting salary in top trades",stat:"Electricians $61K · Plumbers $59K · HVAC $51K",byRace:{"White":"$58K avg","Black":"$51K avg","Hispanic":"$49K avg","Asian":"$60K avg","Indigenous":"$47K avg","Multiracial / Other":"$52K avg"},byGender:{"Man":"$62K avg","Woman":"$44K avg (field is changing)","Non-binary / Gender non-conforming":"$46K avg"}},
     health:{headline:"55% have employer health coverage; union trades 78%",stat:"Physical demands — injury rates vary by trade",byRace:{"White":"61%","Black":"52%","Hispanic":"47%","Asian":"58%","Indigenous":"45%","Multiracial / Other":"50%"},byGender:{"Man":"58%","Woman":"49%","Non-binary / Gender non-conforming":"~44%"}},
     relationship:{headline:"58% marriage rate — stable employment helps",stat:"Similar to general population average",byRace:{"White":"62%","Black":"41%","Hispanic":"54%","Asian":"63%","Indigenous":"44%","Multiracial / Other":"52%"},byGender:{"Man":"61%","Woman":"53%","Non-binary / Gender non-conforming":"~40%"}},
     legal:{headline:"Low legal risk — licensed & regulated profession",stat:"Licensing creates accountability and protection",byRace:{"All groups":"Low"},byGender:{"All groups":"Very low"}},
   },
   beatsOdds:["Apprenticeships let you earn while you learn — no tuition debt","Union membership closes the racial wage gap in trades","Women in union trades earn within 90% of male counterparts"],
   resources:[{emoji:"🛠️",label:"Apprenticeship.gov",url:"https://www.apprenticeship.gov",desc:"Find paid apprenticeships in your trade"},{emoji:"👷",label:"Job Corps",url:"https://www.jobcorps.gov",desc:"Free trade training for 16–24 year olds"}],
   sources:["BLS 2023","DOL","NABTU"]},
  {id:"dropout",category:"education",icon:"📉",riskScore:72,title:"No Degree / Drop Out",tagline:"Leaving school without a degree or certification",titleEs:"Sin Título / Abandonar la Escuela",taglineEs:"Dejar la escuela sin un título o certificación",
   outcomes:{
     financial:{headline:"$853/wk median — $395 less than college grads weekly",stat:"Unemployment rate 5.5% vs 2.2% for college grads",byRace:{"White":"$918/wk","Black":"$759/wk","Hispanic":"$761/wk","Asian":"$892/wk","Indigenous":"$701/wk","Multiracial / Other":"$780/wk"},byGender:{"Man":"$926/wk","Woman":"$781/wk","Non-binary / Gender non-conforming":"~$720/wk"}},
     health:{headline:"3x more likely to be uninsured",stat:"Life expectancy 5+ years shorter than degree holders",byRace:{"White":"18% uninsured","Black":"24%","Hispanic":"35%","Asian":"14%","Indigenous":"29%","Multiracial / Other":"25%"},byGender:{"Man":"22%","Woman":"18%","Non-binary / Gender non-conforming":"~31%"}},
     relationship:{headline:"50%+ higher divorce & separation rate",stat:"Financial stress is the #1 cited cause of breakups",byRace:{"White":"48%","Black":"55%","Hispanic":"45%","Asian":"38%","Indigenous":"52%","Multiracial / Other":"47%"},byGender:{"Man":"51%","Woman":"49%","Non-binary / Gender non-conforming":"~57%"}},
     legal:{headline:"3.5x more likely to be arrested vs. degree holders",stat:"Economic precarity strongly correlates with legal system contact",byRace:{"White":"Moderate","Black":"Very high elevation","Hispanic":"High elevation","Asian":"Low","Indigenous":"Very high","Multiracial / Other":"Moderate-high"},byGender:{"Man":"High risk","Woman":"Moderate","Non-binary / Gender non-conforming":"Moderate-high"}},
   },
   beatsOdds:["A GED opens doors to community college and most jobs","Trade certifications can fully replace a degree in many fields","Adult education programs are free in most states"],
   resources:[{emoji:"📝",label:"Get Your GED",url:"https://ged.com",desc:"Official GED testing — prep resources included"},{emoji:"💼",label:"Job Corps",url:"https://www.jobcorps.gov",desc:"Free education & job training for ages 16–24"}],
   sources:["BLS 2023","Census Bureau","NCES"]},
  {id:"military",category:"career",icon:"🎖️",riskScore:45,title:"Military / Armed Forces",tagline:"Enlisting or commissioning into military service",titleEs:"Fuerzas Armadas / Militar",taglineEs:"Alistarse o comisionarse en el servicio militar",
   outcomes:{
     financial:{headline:"Free housing, healthcare + $25K–$50K starting pay",stat:"GI Bill covers 4-year tuition + $2,200/month housing",byRace:{"White":"Full benefits","Black":"Underrepresented in officer ranks","Hispanic":"Fastest-growing enlisted demographic","Asian":"High in technical roles","Indigenous":"Highest per-capita enlistment rate","Multiracial / Other":"Full benefits"},byGender:{"Man":"Full combat roles","Woman":"All roles open since 2016","Non-binary / Gender non-conforming":"Policy evolving"}},
     health:{headline:"Full healthcare for service members and families",stat:"PTSD affects 11–20% of combat veterans",byRace:{"All groups":"Similar access; PTSD treatment gap affects all"},byGender:{"Man":"Higher combat exposure","Woman":"Higher rates of military sexual trauma","Non-binary / Gender non-conforming":"Elevated mental health risk"}},
     relationship:{headline:"Divorce rate 15% higher than civilian average",stat:"Deployment + relocation strains families",byRace:{"All groups":"Similar impact"},byGender:{"Man":"Partner bears home burden","Woman":"Higher divorce rate than male service members","Non-binary / Gender non-conforming":"Additional identity stressors"}},
     legal:{headline:"UCMJ governs conduct; veterans get strong protections",stat:"SCRA protects finances during active duty",byRace:{"Black & Hispanic":"Disproportionately subject to military justice"},byGender:{"Man":"Standard","Woman":"MST legal protections improving","Non-binary / Gender non-conforming":"Evolving protections"}},
   },
   beatsOdds:["GI Bill is one of the most powerful wealth-building tools for young Americans","Veterans have the lowest unemployment rate of any demographic","Military opens doors to federal careers and leadership roles"],
   resources:[{emoji:"🎓",label:"GI Bill Benefits",url:"https://www.benefits.va.gov/gibill",desc:"Free college + monthly housing stipend for veterans"},{emoji:"🧠",label:"Military OneSource",url:"https://www.militaryonesource.mil",desc:"Mental health & family support for service members"}],
   sources:["DoD 2023","VA Benefits Data","RAND"]},
  {id:"entrepreneur",category:"career",icon:"🚀",riskScore:62,title:"Start a Business",tagline:"Launch your own business or startup",titleEs:"Iniciar un Negocio",taglineEs:"Lanzar tu propio negocio o startup",
   outcomes:{
     financial:{headline:"Only 20% of businesses survive past 5 years",stat:"Median founder income lower than employment in years 1–3",byRace:{"White":"21% 5-yr survival","Black":"16% (capital access is key barrier)","Hispanic":"18%","Asian":"22%","Indigenous":"14%","Multiracial / Other":"17%"},byGender:{"Man":"21%","Woman":"19% (growing fastest)","Non-binary / Gender non-conforming":"~17%"}},
     health:{headline:"High stress — but high purpose and autonomy",stat:"72% report work-life imbalance in first 3 years",byRace:{"All groups":"Similar stress — capital access differs"},byGender:{"Man":"High stress","Woman":"Very high","Non-binary / Gender non-conforming":"Very high"}},
     relationship:{headline:"62% report relationships strained in first 3 years",stat:"Long hours + financial uncertainty = top stressors",byRace:{"All groups":"Similar"},byGender:{"Man":"64%","Woman":"60%","Non-binary / Gender non-conforming":"~61%"}},
     legal:{headline:"Moderate legal exposure — contracts, taxes, liability",stat:"LLC/Corp structure reduces personal legal risk",byRace:{"All groups":"Similar; legal resource access varies"},byGender:{"All groups":"Similar"}},
   },
   beatsOdds:["Black-owned businesses are the fastest growing in the US","SBA loans and minority grants have huge unused capacity","SCORE offers free mentorship from experienced owners"],
   resources:[{emoji:"💼",label:"SBA — Small Business Administration",url:"https://www.sba.gov",desc:"Loans, grants & free business counseling"},{emoji:"🌍",label:"Minority Business Development Agency",url:"https://www.mbda.gov",desc:"Grants & resources for minority-owned businesses"}],
   sources:["SBA 2023","Kauffman Foundation"]},
  {id:"gig",category:"career",icon:"📱",riskScore:55,title:"Gig Economy Full-Time",tagline:"Uber, DoorDash, Fiverr, freelancing as primary income",titleEs:"Economía Gig a Tiempo Completo",taglineEs:"Uber, DoorDash, Fiverr, trabajo freelance como ingreso principal",
   outcomes:{
     financial:{headline:"$38K median annual income — zero employer benefits",stat:"Income varies 40%+ month to month",byRace:{"White":"$41K","Black":"$34K","Hispanic":"$32K","Asian":"$43K","Indigenous":"$30K","Multiracial / Other":"$35K"},byGender:{"Man":"$41K","Woman":"$35K","Non-binary / Gender non-conforming":"~$33K"}},
     health:{headline:"72% of full-time gig workers lack health insurance",stat:"ACA plans avg $500+/month without employer subsidy",byRace:{"White":"65% uninsured","Black":"78%","Hispanic":"82%","Asian":"61%","Indigenous":"85%","Multiracial / Other":"75%"},byGender:{"Man":"74%","Woman":"70%","Non-binary / Gender non-conforming":"~78%"}},
     relationship:{headline:"Flexibility helps — income instability hurts",stat:"Financial unpredictability is a top relationship stressor",byRace:{"All groups":"Similar"},byGender:{"All groups":"Similar"}},
     legal:{headline:"Tax misclassification and non-filing are common traps",stat:"IRS audits self-employed at higher rates",byRace:{"All groups":"Similar"},byGender:{"All groups":"Similar"}},
   },
   beatsOdds:["High-skill freelancers regularly earn $80–150K+","Gig work + upskilling is a proven path to full employment","ACA subsidies may make health coverage affordable"],
   resources:[{emoji:"🏥",label:"HealthCare.gov — ACA Marketplace",url:"https://www.healthcare.gov",desc:"Find affordable health insurance as a self-employed worker"},{emoji:"🤝",label:"Freelancers Union",url:"https://www.freelancersunion.org",desc:"Benefits, advocacy & community for independent workers"}],
   sources:["McKinsey 2022","Freelancers Union 2023"]},
  {id:"cohabitation",category:"relationships",icon:"🏠",riskScore:30,title:"Living Together Before Marriage",tagline:"Moving in with a partner before getting married",titleEs:"Vivir Juntos Antes del Matrimonio",taglineEs:"Mudarse con una pareja antes de casarse",
   outcomes:{
     financial:{headline:"Avg $15K–$20K saved per year sharing living costs",stat:"Financial compatibility easier to assess before committing",byRace:{"All groups":"Similar"},byGender:{"All groups":"Similar"}},
     health:{headline:"Companionship benefits mental health when healthy",stat:"Unhealthy dynamics become harder to exit",byRace:{"All groups":"Similar"},byGender:{"Woman":"Higher DV risk if unhealthy","Man":"Mental health benefit from stable partnership","Non-binary / Gender non-conforming":"Elevated risk if partner is unsupportive"}},
     relationship:{headline:"Intentional cohabitation = 12% more likely to stay together",stat:"'Sliding not deciding' raises divorce risk by 19%",byRace:{"All groups":"Similar; cultural attitudes vary"},byGender:{"All groups":"Intention is the key factor"}},
     legal:{headline:"No automatic legal protections without marriage",stat:"Common-law marriage only in 8 states",byRace:{"All groups":"Same legal status"},byGender:{"Woman":"More vulnerable without legal protection","Man":"Less exposure","Non-binary / Gender non-conforming":"Limited recognition in many states"}},
   },
   beatsOdds:["Discussing finances before moving in cuts conflict by 40%","Cohabitation agreements protect both partners","Intentional timelines dramatically improve outcomes"],
   resources:[{emoji:"❤️",label:"Love Is Respect",url:"https://www.loveisrespect.org",desc:"Understand healthy vs. unhealthy relationships"},{emoji:"💵",label:"Consumer.gov — Managing Money Together",url:"https://consumer.gov/managing-your-money",desc:"Free financial planning basics for couples"}],
   sources:["Journal of Marriage & Family","Pew 2022","CDC"]},
  {id:"early_marriage",category:"relationships",icon:"💍",riskScore:52,title:"Marriage Before Age 25",tagline:"Getting married in your late teens or early twenties",titleEs:"Matrimonio Antes de los 25",taglineEs:"Casarse en la adolescencia tardía o principios de los veinte",
   outcomes:{
     financial:{headline:"38% higher divorce rate — divorce costs $15K–$30K avg",stat:"Financial recovery after divorce takes 3–5 years",byRace:{"White":"40%","Black":"55%","Hispanic":"45%","Asian":"28%","Indigenous":"50%","Multiracial / Other":"42%"},byGender:{"Man":"Financial liability more common","Woman":"Career interruption more common","Non-binary / Gender non-conforming":"High variability"}},
     health:{headline:"Stable marriage improves health — unstable reverses it",stat:"Unhappy marriage is worse for mental health than being single",byRace:{"All groups":"Similar; socioeconomic stress amplifies"},byGender:{"Man":"Greater benefit from stable marriage","Woman":"Greater harm from unstable","Non-binary / Gender non-conforming":"Similar to women's pattern"}},
     relationship:{headline:"48% of under-25 marriages end in divorce within 10 years",stat:"Identity development continues through mid-20s",byRace:{"White":"45%","Black":"58%","Hispanic":"50%","Asian":"35%","Indigenous":"52%","Multiracial / Other":"48%"},byGender:{"Man":"Lower divorce initiation","Woman":"Initiate 70% of divorces","Non-binary / Gender non-conforming":"High variability"}},
     legal:{headline:"Divorce, custody & assets create legal complexity",stat:"Low risk initially — grows with assets and children",byRace:{"All groups":"Similar; legal aid varies by income"},byGender:{"Man":"More often hit by financial judgments","Woman":"More often affected by custody","Non-binary / Gender non-conforming":"Variable"}},
   },
   beatsOdds:["Pre-marital financial literacy reduces divorce rates by ~30%","Couples who discuss money and values openly succeed at much higher rates","Community and faith networks strongly buffer early marriage risks"],
   resources:[{emoji:"💑",label:"Prepare/Enrich",url:"https://www.prepare-enrich.com",desc:"Research-backed pre-marital counseling program"},{emoji:"❤️",label:"Love Is Respect",url:"https://www.loveisrespect.org",desc:"Is your relationship healthy?"}],
   sources:["CDC 2022","Pew","Journal of Family Psychology"]},
  {id:"young_parent",category:"relationships",icon:"👶",riskScore:65,title:"Having Children Before 25",tagline:"Becoming a parent in your teens or early twenties",titleEs:"Tener Hijos Antes de los 25",taglineEs:"Convertirse en padre o madre en la adolescencia o a principios de los veinte",
   outcomes:{
     financial:{headline:"$250K+ cost to raise one child to age 18",stat:"Young parents earn 40% less over lifetime vs. peers",byRace:{"White":"~$300K","Black":"~$220K","Hispanic":"~$210K","Asian":"~$310K","Indigenous":"~$195K","Multiracial / Other":"~$230K"},byGender:{"Man":"Avg 1 yr career interruption","Woman":"Avg 4.5 yr career interruption","Non-binary / Gender non-conforming":"Significant variability"}},
     health:{headline:"2x higher postpartum depression rates for young parents",stat:"Teen mothers face elevated obstetric complications",byRace:{"White":"Baseline","Black":"3x higher maternal mortality — systemic failure","Hispanic":"1.4x baseline","Asian":"Below baseline","Indigenous":"2.3x higher","Multiracial / Other":"1.5x baseline"},byGender:{"Man":"Mental health stress","Woman":"Direct physical health risk","Non-binary / Gender non-conforming":"High risk — often without tailored care"}},
     relationship:{headline:"80% of teen parents no longer together at 5 years",stat:"Co-parenting challenges persist after separation",byRace:{"All groups":"Similar separation rates"},byGender:{"Man":"Higher disengagement rate","Woman":"More often primary caregiver","Non-binary / Gender non-conforming":"Variable"}},
     legal:{headline:"Child support & custody create ongoing legal obligations",stat:"Non-payment can lead to license suspension or incarceration",byRace:{"White":"Similar","Black":"Disproportionately affected","Hispanic":"Moderate elevation","Asian":"Similar","Indigenous":"Disproportionate enforcement","Multiracial / Other":"Similar"},byGender:{"Man":"More often subject to support orders","Woman":"More often recipient","Non-binary / Gender non-conforming":"Variable"}},
   },
   beatsOdds:["Extended family support dramatically improves young parent outcomes","WIC and CHIP provide free food and healthcare","Young parents who complete education match peers' earnings within 15 years"],
   resources:[{emoji:"🍼",label:"WIC — Free Food & Nutrition",url:"https://www.fns.usda.gov/wic",desc:"Free food, formula & nutrition help for young families"},{emoji:"🏥",label:"Medicaid & CHIP",url:"https://www.medicaid.gov/chip/index.html",desc:"Free or low-cost healthcare for children and parents"}],
   sources:["CDC 2022","Urban Institute","Census Bureau"]},
  {id:"substances",category:"lifestyle",icon:"⚠️",riskScore:78,title:"Regular Substance Use",tagline:"Regular use of cannabis, alcohol, or other substances",titleEs:"Uso Regular de Sustancias",taglineEs:"Uso regular de cannabis, alcohol u otras sustancias",
   outcomes:{
     financial:{headline:"Up to -$20K/year in wages, healthcare & legal fees",stat:"Heavy users lose avg 14 productive workdays per year",byRace:{"All groups":"Similar financial impact — legal consequences vary sharply"},byGender:{"Man":"Higher overall use rates","Woman":"Faster biological progression to dependence","Non-binary / Gender non-conforming":"Highest risk for substance use disorders"}},
     health:{headline:"7+ year reduction in life expectancy for heavy users",stat:"Cannabis: respiratory & cognitive impacts with daily use",byRace:{"All groups":"Similar outcomes; access to treatment varies"},byGender:{"Man":"Higher overdose mortality","Woman":"Faster liver damage from alcohol","Non-binary / Gender non-conforming":"High mental health comorbidity"}},
     relationship:{headline:"3x higher breakup/divorce rate for substance-dependent people",stat:"Addiction cited in 50% of divorces nationally",byRace:{"All groups":"Similar"},byGender:{"Man":"Partner more often affected","Woman":"Linked to elevated DV risk","Non-binary / Gender non-conforming":"High risk"}},
     legal:{headline:"⚠️ Drug arrests are RACIALLY DISPARATE despite equal usage rates",stat:"Black Americans 3.73x more likely to be arrested for cannabis",byRace:{"White":"Baseline","Black":"3.73x higher (ACLU)","Hispanic":"1.7x higher","Asian":"Below baseline","Indigenous":"2.5x higher","Multiracial / Other":"1.5x higher"},byGender:{"Man":"6x more likely arrested than women","Woman":"Lower but rising","Non-binary / Gender non-conforming":"Elevated and variable"}},
   },
   beatsOdds:["Early intervention before dependence has 80%+ success rate","Recovery programs have 40–60% long-term success","Many states allow expungement of drug records"],
   resources:[{emoji:"📞",label:"SAMHSA Helpline (Substance Abuse and Mental Health Services Administration)",url:"https://www.samhsa.gov/find-help/national-helpline",desc:"Free & confidential treatment referrals 24/7 — 1-800-662-4357"},{emoji:"💬",label:"Crisis Text Line",url:"https://www.crisistextline.org",desc:"Text HOME to 741741 — free crisis support anytime"}],
   sources:["ACLU 2023","SAMHSA 2022","NIH"]},
  {id:"city_move",category:"lifestyle",icon:"🏙️",riskScore:36,title:"Moving to a Major City",tagline:"Relocating to a large US urban area for opportunity",titleEs:"Mudarse a una Ciudad Grande",taglineEs:"Reubicarse en una gran área urbana de EE.UU. por oportunidades",
   outcomes:{
     financial:{headline:"+$18K avg wage premium in major metros vs. rural",stat:"But NYC/SF/LA cost-of-living can fully negate the gain",byRace:{"White":"Full premium","Black":"+$14K (housing discrimination limits access)","Hispanic":"+$13K","Asian":"+$22K","Indigenous":"+$11K","Multiracial / Other":"+$14K"},byGender:{"Man":"+$19K avg","Woman":"+$16K avg","Non-binary / Gender non-conforming":"+$14K avg"}},
     health:{headline:"Better healthcare access; but higher stress and loneliness",stat:"30% of urban adults report feeling seriously lonely",byRace:{"All groups":"Access improves; neighborhood quality varies"},byGender:{"All groups":"Similar; women report higher urban loneliness"}},
     relationship:{headline:"Larger social pool — harder to build deep community",stat:"Social networks take longer to build in new cities",byRace:{"All groups":"Existing community networks are the strongest buffer"},byGender:{"All groups":"Similar"}},
     legal:{headline:"More legal protections and resources in cities",stat:"Higher legal costs if representation is needed",byRace:{"White":"Lower police contact","Black":"Higher contact in urban areas","Hispanic":"Elevated","Asian":"Lower","Indigenous":"Elevated","Multiracial / Other":"Moderate"},byGender:{"Man":"Higher police contact","Woman":"Higher housing harassment risk","Non-binary / Gender non-conforming":"Elevated bias incident risk"}},
   },
   beatsOdds:["Research cost-of-living vs. salary before accepting any offer","Cities with strong minority communities offer powerful networks","Remote work may let you earn city-level wages without city-level rent"],
   resources:[{emoji:"🏙️",label:"NerdWallet Cost of Living Calculator",url:"https://www.nerdwallet.com/cost-of-living-calculator",desc:"Compare your current city to any city in the US"}],
   sources:["Census 2023","Brookings","Harvard Opportunity Atlas"]},
  {id:"mental_health",category:"identity",icon:"🧠",riskScore:40,title:"Seeking Mental Health Treatment",tagline:"Getting therapy, counseling, or psychiatric care",titleEs:"Buscar Tratamiento de Salud Mental",taglineEs:"Terapia, consejería o atención psiquiátrica",
   outcomes:{
     financial:{headline:"Therapy avg $100–200/session — but 80% of insurance plans cover it",stat:"Untreated mental illness costs avg $19K/yr in lost productivity",byRace:{"White":"72% access care","Black":"39% access care","Hispanic":"35%","Asian":"25% — stigma is the primary barrier","Indigenous":"29%","Multiracial / Other":"41%"},byGender:{"Man":"35% seek help — the highest treatment gap of any group","Woman":"52%","Non-binary / Gender non-conforming":"Higher need, lower access"}},
     health:{headline:"Treatment reduces suicide risk by 60%+",stat:"Untreated depression shortens life expectancy by 7–10 years",byRace:{"All groups":"Similar clinical outcomes — access is the barrier, not effectiveness"},byGender:{"All groups":"Similar outcomes when treatment is accessed"}},
     relationship:{headline:"Mental health treatment consistently improves all relationships",stat:"72% report significantly improved relationships after 6 months of therapy",byRace:{"All groups":"Similar"},byGender:{"All groups":"Similar"}},
     legal:{headline:"Very low legal risk — HIPAA protects your privacy",stat:"Mental health records are among the most legally protected in the US",byRace:{"All groups":"Similar"},byGender:{"All groups":"Very low"}},
   },
   beatsOdds:["School counselors can connect you to free or sliding-scale care","Community mental health centers offer care regardless of ability to pay","Teletherapy — online therapy with the same effectiveness — has made access dramatically easier"],
   resources:[{emoji:"📱",label:"Crisis Text Line",url:"https://www.crisistextline.org",desc:"Text HOME to 741741 — free, 24/7"},{emoji:"🧠",label:"NAMI — National Alliance on Mental Illness",url:"https://www.nami.org",desc:"Find support, education & local resources"},{emoji:"💻",label:"Open Path Collective",url:"https://openpathcollective.org",desc:"Affordable therapy $30–$80/session"}],
   sources:["NAMI 2023","APA","SAMHSA"]},
  {id:"social_media",category:"identity",icon:"📲",riskScore:48,title:"Social Media as Identity",tagline:"When online life becomes your primary world",titleEs:"Redes Sociales como Identidad",taglineEs:"Cuando la vida en línea se convierte en tu mundo principal",
   outcomes:{
     financial:{headline:"$0 to $1M+ — extreme variance in creator economy",stat:"Only 3% of creators earn a living wage from content alone",byRace:{"White":"Higher brand deal rates","Black":"30% lower brand deal offers for equal-sized audiences","Hispanic":"Growing but underpaid","Asian":"Strong in specific niches","Indigenous":"Significant audience but lowest monetization","Multiracial / Other":"Variable"},byGender:{"Man":"Higher gaming/tech niches","Woman":"Higher lifestyle/beauty niches — also higher harassment","Non-binary / Gender non-conforming":"Niche audiences, vulnerable to platform bans"}},
     health:{headline:"Heavy social media use linked to 2.7x higher depression rates in teens",stat:"Comparing yourself online is clinically measurable as a health risk",byRace:{"All groups":"Similar — colorism and beauty standards amplify for women of color"},byGender:{"Woman":"Highest mental health impact","Man":"Gaming addiction more prevalent","Non-binary / Gender non-conforming":"Highest risk for online harassment-related trauma"}},
     relationship:{headline:"Online community can be real — but can't replace in-person connection",stat:"Teens with 5+ hrs/day online report 3x higher loneliness",byRace:{"All groups":"Similar"},byGender:{"All groups":"Similar"}},
     legal:{headline:"Content creators face copyright, defamation, and privacy risks",stat:"FTC requires disclosure of paid partnerships",byRace:{"All groups":"Similar"},byGender:{"Woman":"Higher risk of non-consensual image sharing"}},
   },
   beatsOdds:["Use social media as a launchpad, not a destination","Creators with multiple income streams survive algorithm changes","Your real-world skills determine your ceiling, not your follower count"],
   resources:[{emoji:"🎓",label:"YouTube Creator Academy",url:"https://creatoracademy.youtube.com",desc:"Free education on building a sustainable channel"},{emoji:"🧠",label:"Center for Humane Technology",url:"https://www.humanetech.com",desc:"Understand how social media affects your brain"}],
   sources:["APA 2023","FTC","Pew Research"]},
  {id:"immigration",category:"identity",icon:"🌎",riskScore:68,title:"Navigating Undocumented Status",tagline:"Living and planning your future without documentation",titleEs:"Navegar el Estatus Indocumentado",taglineEs:"Vivir y planificar tu futuro sin documentación",
   outcomes:{
     financial:{headline:"Undocumented workers earn 40% less for the same work",stat:"DACA recipients average $25K more per year than undocumented peers",byRace:{"Hispanic":"73% of undocumented population","Asian":"14%","Black":"6%","White":"5%","All others":"2%"},byGender:{"Man":"Higher deportation risk","Woman":"Higher domestic vulnerability + lower wages","Non-binary / Gender non-conforming":"Highest risk — least institutional support"}},
     health:{headline:"1 in 4 undocumented immigrants avoid medical care due to fear",stat:"Emergency Medicaid is available in most states regardless of status",byRace:{"All groups":"Fear of deportation is the universal barrier"},byGender:{"Woman":"Reproductive healthcare critically limited","Man":"Work injuries most common unaddressed issue","Non-binary / Gender non-conforming":"Almost no tailored care exists"}},
     relationship:{headline:"Deportation fear damages family unity and mental health",stat:"Children of deported parents have 4x higher depression rates",byRace:{"All groups":"Similar — mixed-status families most affected"},byGender:{"All groups":"Similar"}},
     legal:{headline:"DACA and TPS offer significant protection — know what applies to you",stat:"Legal representation increases positive immigration outcomes by 10x",byRace:{"All groups":"Outcomes identical with legal representation"},byGender:{"Woman":"VAWA protections available for DV victims regardless of status","Man":"Higher criminal justice system intersection risk"}},
   },
   beatsOdds:["DACA application costs $495 — many nonprofits cover this fee","Every state has free immigration legal clinics","Higher education is possible — DACA students have accessed over $1B in scholarships"],
   resources:[{emoji:"⚖️",label:"Immigrant Legal Resource Center",url:"https://www.ilrc.org",desc:"Free legal guides for immigrants in all situations"},{emoji:"🎓",label:"TheDream.US Scholarship",url:"https://www.thedream.us",desc:"Scholarships specifically for DACA and TPS recipients"},{emoji:"📞",label:"United We Dream",url:"https://unitedwedream.org",desc:"DACA renewal help, legal support & community"}],
   sources:["American Immigration Council 2023","ILRC","Pew Research"]},
];

const ASSESSMENT_QUESTIONS=[
  {id:"decision",label:"What decision are you facing right now?",labelEs:"¿Qué decisión estás enfrentando ahora?",type:"text",placeholder:"e.g. Should I drop out of college and start working full-time?",placeholderEs:"ej. ¿Debería dejar la universidad y empezar a trabajar?"},
  {id:"age",label:"How old are you?",labelEs:"¿Cuántos años tienes?",type:"select",options:["17 or younger","18–19","20–21","22–24","25–27"],optionsEs:["17 o menos","18–19","20–21","22–24","25–27"]},
  {id:"urgency",label:"How urgent is this decision?",labelEs:"¿Qué tan urgente es esta decisión?",type:"select",options:["This week","Within a month","Within 6 months","Just exploring"],optionsEs:["Esta semana","En un mes","En 6 meses","Solo explorando"]},
  {id:"support",label:"What kind of support do you have?",labelEs:"¿Qué tipo de apoyo tienes?",type:"select",options:["Strong family & community support","Some support","Mostly on my own","No real support network"],optionsEs:["Fuerte apoyo familiar y comunitario","Algo de apoyo","Principalmente solo/a","Sin red de apoyo real"]},
  {id:"goal",label:"What matters most to you right now?",labelEs:"¿Qué te importa más ahora mismo?",type:"select",options:["Financial security","Freedom & independence","Family & relationships","Personal growth & purpose","Making an impact"],optionsEs:["Seguridad financiera","Libertad e independencia","Familia y relaciones","Crecimiento personal y propósito","Generar un impacto"]},
  {id:"fear",label:"What's your biggest fear about this decision?",labelEs:"¿Cuál es tu mayor miedo sobre esta decisión?",type:"text",placeholder:"Be honest — this gives you more useful insight",placeholderEs:"Sé honesto/a — esto te dará una perspectiva más útil"},
];

// ── HELPERS ───────────────────────────────────────────────────────────────────
function getRiskLevel(s,lang="en"){
  const isEs=lang==="es";
  if(s<35)return{label:isEs?"🟢 Tranquilo":"🟢 Chill",color:"#22c55e",sentence:isEs?"La mayoría de las personas en este camino navegan bien. Los desafíos existen pero son muy manejables.":"Most people who take this path report solid outcomes — challenges exist but are very manageable."};
  if(s<55)return{label:isEs?"🟡 Riesgoso":"🟡 Risky",color:"#f59e0b",sentence:isEs?"Este camino tiene desafíos reales, pero la mayoría los supera con la preparación adecuada.":"This path has real challenges, but most people navigate them successfully with the right preparation."};
  if(s<70)return{label:isEs?"🟠 Muy Riesgoso":"🟠 Seriously Risky",color:"#f97316",sentence:isEs?"Los desafíos serios afectan a la mayoría. Ir preparado marca una gran diferencia.":"Serious challenges affect most people who choose this — going in prepared makes a huge difference."};
  return{label:isEs?"🔴 Alto Riesgo":"🔴 High Stakes",color:"#ef4444",sentence:isEs?"La mayoría enfrenta contratiempos importantes. Conocer los riesgos es tu mayor ventaja.":"Most people who go this route face major setbacks. Knowing the risks upfront is your biggest advantage."};
}

// ── PASSWORD GATE ─────────────────────────────────────────────────────────────
function PasswordGate({onUnlock,lang="en"}){
  const[input,setInput]=useState("");
  const[error,setError]=useState(false);
  const check=()=>{
    if(input==="lifelens2025"){onUnlock();}
    else{setError(true);setInput("");setTimeout(()=>setError(false),2000);}
  };
  return(
    <div style={{background:C.bg,minHeight:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{textAlign:"center",marginBottom:32}}>
        <div style={{fontSize:52,marginBottom:12}}>🧭</div>
        <h1 style={{color:C.text,fontSize:26,fontWeight:900,margin:0}}>LifeLens</h1>
        <p style={{color:C.muted,fontSize:13,marginTop:6}}>{tx(lang,"appTagline")}</p>
      </div>
      <div style={{background:C.card,border:`1px solid ${error?"#ef4444":C.border}`,borderRadius:18,padding:28,maxWidth:380,width:"100%",textAlign:"center",transition:"border-color 0.3s"}}>
        <div style={{fontSize:15,fontWeight:700,color:C.accentLight,marginBottom:6}}>{tx(lang,"enterCode")}</div>
        <div style={{fontSize:13,color:C.muted,marginBottom:20}}>{tx(lang,"privateBeta")}</div>
        <input type="password" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&check()} placeholder={tx(lang,"enterPlaceholder")}
          style={{width:"100%",background:C.deep,border:`1px solid ${error?"#ef4444":C.border}`,borderRadius:12,padding:"14px",color:C.text,fontSize:16,outline:"none",boxSizing:"border-box",textAlign:"center",letterSpacing:4,marginBottom:12,fontFamily:"inherit"}}/>
        {error&&<div style={{color:"#ef4444",fontSize:13,marginBottom:10}}>{tx(lang,"wrongCode")}</div>}
        <button onClick={check} style={{width:"100%",background:`linear-gradient(135deg,${C.accent},#9333ea)`,border:"none",borderRadius:12,padding:"14px",color:"white",fontSize:15,fontWeight:700,cursor:"pointer",minHeight:50,boxShadow:"0 4px 20px rgba(124,58,237,0.4)"}}>
          {tx(lang,"enterBtn")}
        </button>
        <div style={{display:"flex",gap:8,justifyContent:"center",marginTop:16}}>
          <button onClick={()=>{}} style={{background:"#2d1a4a",border:"none",borderRadius:20,padding:"5px 14px",color:"white",fontSize:12,cursor:"pointer",opacity:lang==="en"?1:0.5}} >🇺🇸 EN</button>
          <button onClick={()=>{}} style={{background:"#2d1a4a",border:"none",borderRadius:20,padding:"5px 14px",color:"white",fontSize:12,cursor:"pointer",opacity:lang==="es"?1:0.5}}>🇪🇸 ES</button>
        </div>
      </div>
    </div>
  );
}

// ── WELCOME BRIDGE ────────────────────────────────────────────────────────────
function WelcomeBridge({onReady,lang="en"}){
  const isEs=lang==="es";
  const legend=isEs?LEGEND_ES:LEGEND_EN;
  const descs_en=["Most people on this path navigate it well. Challenges exist but are very manageable with basic preparation.","Real challenges ahead. Most people get through — but going in eyes-open makes a significant difference.","This path hits most people hard in at least one area. Preparation isn't optional here — it's essential.","The majority of people who take this route face major setbacks. Knowing this upfront is your biggest advantage."];
  const descs_es=["La mayoría navega bien este camino. Los desafíos existen pero son manejables con preparación básica.","Hay desafíos reales. La mayoría lo logra — pero ir con los ojos abiertos marca una diferencia significativa.","Este camino golpea fuerte en al menos un área. La preparación no es opcional aquí — es esencial.","La mayoría de las personas que toman esta ruta enfrentan contratiempos importantes. Saber esto es tu mayor ventaja."];
  return(
    <div style={{background:C.bg,minHeight:"100%",overflowY:"auto",padding:"24px 20px 40px",maxWidth:480,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <div style={{fontSize:44,marginBottom:10}}>🧭</div>
        <div style={{fontSize:22,fontWeight:900,color:C.accentLight,marginBottom:6}}>{isEs?"Antes de empezar...":"Before you explore your data..."}</div>
        <div style={{fontSize:13,color:C.muted}}>{isEs?"Un momento. Esto es importante.":"One moment. This matters."}</div>
      </div>
      <div style={{background:"linear-gradient(135deg,#1a0a3d,#1e1040)",border:`1px solid ${C.border}`,borderRadius:16,padding:20,marginBottom:20}}>
        <div style={{fontSize:11,color:C.accentBright,fontWeight:700,textTransform:"uppercase",letterSpacing:1,marginBottom:12}}>{isEs?"Una nota de Ms. Chavez":"A note from Ms. Chavez"}</div>
        <p style={{fontSize:14,color:"#ede9fe",lineHeight:1.8,margin:"0 0 12px",fontStyle:"italic"}}>{isEs?"Construí LifeLens porque pasé 25 años viendo a jóvenes brillantes tomar decisiones de vida sin tener la información completa. No por falta de inteligencia — sino porque nadie se sentó con ellos y les mostró el panorama real antes de que fuera demasiado tarde.":"I built LifeLens because I spent 25 years watching brilliant teenagers make life-changing decisions in the dark. Not for lack of intelligence — but because nobody sat them down and showed them the full picture before it was too late."}</p>
        <p style={{fontSize:14,color:C.accentLight,lineHeight:1.8,margin:0,fontWeight:600}}>{isEs?"Esto es eso. La imagen completa. Para ti.":"This is that. The full picture. For you."}</p>
        <div style={{fontSize:12,color:C.muted,marginTop:14,textAlign:"right"}}>— Ms. Chavez, LifeLens</div>
      </div>
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:18,marginBottom:16}}>
        <div style={{fontSize:13,fontWeight:800,color:C.accentLight,marginBottom:12}}>📊 {isEs?"¿De dónde vienen estos datos?":"Where does this data come from?"}</div>
        <p style={{fontSize:13,color:"#ede9fe",lineHeight:1.75,margin:"0 0 10px"}}>{isEs?"Fuentes reales. La Oficina de Estadísticas Laborales de EE.UU. (BLS), los Centros para el Control de Enfermedades (CDC), la Oficina del Censo, y estudios universitarios revisados por pares. No opiniones — evidencia.":"Real sources. The US Bureau of Labor Statistics (BLS — the government agency that tracks employment and wages), the CDC (Centers for Disease Control — which tracks health outcomes), the US Census Bureau, and peer-reviewed university studies. Not opinions — evidence."}</p>
        <div style={{background:C.deep,borderRadius:10,padding:"12px 14px",borderLeft:`3px solid ${C.accent}`,marginBottom:8}}>
          <div style={{fontSize:13,color:C.accentLight,fontWeight:700,marginBottom:4}}>{isEs?"Lo que los datos HACEN:":"What the data DOES:"}</div>
          <div style={{fontSize:13,color:"#e9d5ff",lineHeight:1.7}}>{isEs?"Muestra lo que le sucede a la MAYORÍA de las personas en situaciones similares. Es tu punto de partida — no tu destino.":"Shows what happens to MOST people in similar situations. It is your starting point — not your destination."}</div>
        </div>
        <div style={{background:C.deep,borderRadius:10,padding:"12px 14px",borderLeft:"3px solid #22c55e"}}>
          <div style={{fontSize:13,color:"#22c55e",fontWeight:700,marginBottom:4}}>{isEs?"Lo que los datos NO HACEN:":"What the data DOES NOT do:"}</div>
          <div style={{fontSize:13,color:"#e9d5ff",lineHeight:1.7}}>{isEs?"Predecir TU historia. Tú no eres una estadística. Pero conocer las estadísticas significa que puedes superarlas.":"Predict YOUR story. You are not a statistic. But knowing the statistics means you can beat them."}</div>
        </div>
      </div>
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:18,marginBottom:16}}>
        <div style={{fontSize:13,fontWeight:800,color:C.accentLight,marginBottom:14}}>🎯 {isEs?"Cómo leer la escala de riesgo":"How to read the risk scale"}</div>
        {legend.map(([emoji,label,color],i)=>(
          <div key={label} style={{display:"flex",gap:12,marginBottom:i<3?14:0,alignItems:"flex-start"}}>
            <div style={{fontSize:22,flexShrink:0,marginTop:2}}>{emoji}</div>
            <div>
              <div style={{fontSize:13,fontWeight:800,color,marginBottom:3}}>{label}</div>
              <div style={{fontSize:12,color:C.muted,lineHeight:1.6}}>{isEs?descs_es[i]:descs_en[i]}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:18,marginBottom:16}}>
        <div style={{fontSize:13,fontWeight:800,color:C.accentLight,marginBottom:10}}>👁️ {isEs?'El botón "Demo"':'The "Demo" button'}</div>
        <p style={{fontSize:13,color:"#ede9fe",lineHeight:1.75,margin:0}}>{isEs?'Dentro de cada escenario, encontrarás un botón "Demo: Activado". Cuando está activado, verás tu estadística personalizada Y cómo la misma decisión afecta a diferentes grupos raciales.':'Inside every scenario, you\'ll find a "Demo: On" button. When it\'s on, you\'ll see your personalized stat AND how the same decision affects different racial groups side by side. This is not about comparing yourself to others — it\'s about understanding the real world you are navigating.'}</p>
      </div>
      <div style={{background:"linear-gradient(135deg,#1a0a3d,#1e1040)",border:`1px solid ${C.border}`,borderRadius:14,padding:18,marginBottom:28}}>
        <div style={{fontSize:13,fontWeight:800,color:C.accentBright,marginBottom:12}}>⚡ {isEs?"Una promesa":"A promise"}</div>
        <p style={{fontSize:14,color:"#ede9fe",lineHeight:1.8,margin:"0 0 10px"}}>{isEs?'Al final de cada página de datos, encontrarás una sección llamada «Caminos que Superan las Probabilidades».':'At the end of every single data page, you will find a section called "Paths That Beat the Odds."'}</p>
        <p style={{fontSize:14,color:C.accentLight,lineHeight:1.8,margin:0,fontWeight:600}}>{isEs?"Los datos nunca son la última palabra. Siempre hay un camino a seguir. Siempre.":"The data is never the last word. There is always a path forward. Always."}</p>
      </div>
      <button onClick={onReady} style={{width:"100%",background:`linear-gradient(135deg,${C.accent},#9333ea)`,border:"none",borderRadius:16,padding:"18px",color:"white",fontSize:16,fontWeight:800,cursor:"pointer",minHeight:58,letterSpacing:0.3,boxShadow:"0 4px 24px rgba(124,58,237,0.45)"}}>
        {tx(lang,"readyBtn")}
      </button>
      <div style={{textAlign:"center",fontSize:12,color:C.muted,marginTop:12}}>{isEs?"Puedes volver a esta guía en cualquier momento desde Editar Perfil.":"You can revisit this guide anytime from the Edit Profile button."}</div>
    </div>
  );
}

// ── RISK LEGEND ───────────────────────────────────────────────────────────────
function RiskLegend({compact=false,lang="en"}){
  const legend=lang==="es"?LEGEND_ES:LEGEND_EN;
  return(
    <div style={{display:"flex",gap:6,flexWrap:"wrap",padding:compact?"8px 12px":"10px 14px",background:C.card,borderRadius:12,border:`1px solid ${C.border}`,marginBottom:14}}>
      <span style={{fontSize:12,color:C.muted,width:"100%",marginBottom:3,fontWeight:600}}>{tx(lang,"riskScale")}</span>
      {legend.map(([e,w,c])=><span key={w} style={{fontSize:compact?11:12,color:c,fontWeight:700,marginRight:8}}>{e} {w}</span>)}
    </div>
  );
}

// ── OUTCOME BLOCK (with Compare Groups) ──────────────────────────────────────
function OutcomeBlock({typeId,outcome,profile,showDemo,lang="en"}){
  const t=OUTCOME_TYPES.find(x=>x.id===typeId);
  if(!outcome)return null;
  const rV=outcome.byRace?.[profile.race]||outcome.byRace?.["All groups"];
  const gV=outcome.byGender?.[profile.gender]||outcome.byGender?.["All groups"];
  const hasRaceBreakdown=outcome.byRace&&Object.keys(outcome.byRace).filter(k=>k!=="All groups").length>1;
  return(
    <div style={{background:C.deep,border:`1px solid ${C.border}`,borderRadius:12,padding:14,marginBottom:10}}>
      <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:7}}>
        <span style={{fontSize:15}}>{t.icon}</span>
        <span style={{fontSize:11,fontWeight:700,color:t.color,textTransform:"uppercase",letterSpacing:1}}>{lang==="es"&&t.labelEs?t.labelEs:t.label}</span>
      </div>
      <div style={{fontSize:14,fontWeight:600,color:C.text,lineHeight:1.4,marginBottom:4}}>{outcome.headline}</div>
      <div style={{fontSize:13,color:C.muted,marginBottom:showDemo?10:0}}>{outcome.stat}</div>
      {showDemo&&<>
        {(rV||gV)&&<div style={{background:C.card,borderLeft:`3px solid ${t.color}`,borderRadius:"0 8px 8px 0",padding:"9px 11px",marginBottom:10}}>
          <div style={{fontSize:10,color:C.muted,marginBottom:5,textTransform:"uppercase",letterSpacing:0.8}}>{tx(lang,"yourProfile")}</div>
          {rV&&<div style={{fontSize:13,color:C.text,marginBottom:3}}><span style={{color:C.muted}}>{lang==="es"?getRaceEs(profile.race):profile.race}: </span><span style={{color:t.color,fontWeight:700}}>{rV}</span></div>}
          {gV&&<div style={{fontSize:13,color:C.text}}><span style={{color:C.muted}}>{lang==="es"?getGenderEs(profile.gender):profile.gender}: </span>{gV}</div>}
        </div>}
        {hasRaceBreakdown&&<div>
          <div style={{fontSize:10,color:C.muted,marginBottom:6,textTransform:"uppercase",letterSpacing:0.8,fontWeight:700}}>{tx(lang,"compareGroups")}</div>
          {Object.entries(outcome.byRace).filter(([k])=>k!=="All groups").map(([race,val])=>{
            const isUser=profile.race===race;
            return(
              <div key={race} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 8px",borderRadius:7,marginBottom:3,background:isUser?`rgba(124,58,237,0.15)`:"transparent",border:isUser?`1px solid ${t.color}`:"1px solid transparent"}}>
                <span style={{fontSize:12,color:isUser?t.color:C.muted,fontWeight:isUser?700:400,display:"flex",alignItems:"center",gap:5}}>
                  {isUser&&<span style={{fontSize:10,background:t.color,color:"white",borderRadius:3,padding:"1px 4px",fontWeight:800}}>YOU</span>}
                  {race}
                </span>
                <span style={{fontSize:12,color:isUser?C.text:C.muted,fontWeight:isUser?700:400,maxWidth:"50%",textAlign:"right"}}>{val}</span>
              </div>
            );
          })}
        </div>}
      </>}
    </div>
  );
}

// ── SHADOW SELF ───────────────────────────────────────────────────────────────
function ShadowSelf({lang="en",profile=null}){
  // Smart matching: find best match by race AND gender, fallback to race only, then index 0
  const getStartIdx=()=>{
    if(!profile)return 0;
    // Exact race + gender match
    let i=SHADOW_PROFILES.findIndex(p=>p.race===profile.race&&p.gender===profile.gender);
    if(i>=0)return i;
    // Race only match
    i=SHADOW_PROFILES.findIndex(p=>p.race===profile.race);
    if(i>=0)return i;
    return 0;
  };
  const[idx,setIdx]=useState(getStartIdx);
  const p=SHADOW_PROFILES[idx];
  const isMatched=profile&&(p.race===profile.race&&p.gender===profile.gender);
  const isEs=lang==="es";
  return(
    <div style={{marginBottom:24}}>
      {/* Shadow Self intro explanation */}
      <div style={{background:"linear-gradient(135deg,#1a0a3d,#1e1040)",border:`1px solid ${C.border}`,borderRadius:14,padding:16,marginBottom:14}}>
        <div style={{fontSize:13,fontWeight:800,color:C.accentBright,marginBottom:6}}>👤 {isEs?"¿Qué es una Sombra?":"What is a Shadow Self?"}</div>
        <div style={{fontSize:13,color:"#ede9fe",lineHeight:1.7}}>{isEs?"Una Sombra es un perfil real de un joven como tú, enfrentando una decisión de vida real. Muestra el mejor y el peor resultado posible — para que puedas ver el panorama completo antes de decidir.":"A Shadow Self is a real profile of a young person like you, facing a real life decision. It shows the best and worst case outcome — so you can see the full picture before you choose."}</div>
        {isMatched&&<div style={{marginTop:10,padding:"7px 10px",background:"rgba(124,58,237,0.2)",borderRadius:8,fontSize:12,color:C.accentLight,fontWeight:600}}>✨ {isEs?"El primer perfil coincide con tu raza y género.":"The first profile matches your race and gender."}</div>}
      </div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div>
          <div style={{fontSize:15,fontWeight:800,color:C.accentBright}}>{tx(lang,"shadowSelf")}</div>
          <div style={{fontSize:12,color:C.muted,marginTop:2}}>{tx(lang,"shadowSubtitle")}</div>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <button onClick={()=>setIdx(i=>(i-1+SHADOW_PROFILES.length)%SHADOW_PROFILES.length)} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"6px 12px",color:C.text,fontSize:14,cursor:"pointer",minHeight:36}}>‹</button>
          <span style={{fontSize:12,color:C.muted}}>{idx+1}/{SHADOW_PROFILES.length}</span>
          <button onClick={()=>setIdx(i=>(i+1)%SHADOW_PROFILES.length)} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"6px 12px",color:C.text,fontSize:14,cursor:"pointer",minHeight:36}}>›</button>
        </div>
      </div>
      <div style={{background:"linear-gradient(135deg,#1a0a3d,#1e1040)",border:`1px solid ${C.border}`,borderRadius:16,padding:18,marginBottom:12}}>
        <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:10}}>
          <span style={{fontSize:36}}>{p.emoji}</span>
          <div>
            <div style={{fontSize:17,fontWeight:800,color:C.text}}>{p.name}, {p.age} — {p.city}</div>
            <div style={{fontSize:12,color:C.accentBright,marginTop:2}}>{isEs?getRaceEs(p.race):p.race} · {isEs?getGenderEs(p.gender):p.gender} · {isEs?getSocioEs(p.socio):p.socio} · {isEs?getRegionEs(p.region):p.region}</div>
          </div>
        </div>
        <div style={{fontSize:13,color:"#ede9fe",lineHeight:1.6,background:"rgba(0,0,0,0.25)",borderRadius:10,padding:"10px 12px"}}>
          <span style={{fontWeight:700,color:C.accentLight}}>{tx(lang,"decisionFacing")} </span>{isEs&&SHADOW_TRANSLATIONS[p.name]?SHADOW_TRANSLATIONS[p.name].decision:p.decision}<br/>
          <span style={{color:C.muted,fontSize:12,marginTop:4,display:"block"}}>{isEs&&SHADOW_TRANSLATIONS[p.name]?SHADOW_TRANSLATIONS[p.name].context:p.context}</span>
        </div>
      </div>
      {(()=>{const bc=isEs&&SHADOW_TRANSLATIONS[p.name]?SHADOW_TRANSLATIONS[p.name].bestCase:p.bestCase;const wc=isEs&&SHADOW_TRANSLATIONS[p.name]?SHADOW_TRANSLATIONS[p.name].worstCase:p.worstCase;return(
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:4}}>
        <div style={{background:"linear-gradient(135deg,#052e16,#0d2818)",border:"1px solid #166534",borderRadius:14,padding:14}}>
          <div style={{fontSize:11,fontWeight:800,color:"#22c55e",textTransform:"uppercase",letterSpacing:0.8,marginBottom:6}}>{tx(lang,"bestCase")}</div>
          <div style={{fontSize:12,fontWeight:700,color:"#86efac",lineHeight:1.4,marginBottom:10}}>{bc.label}</div>
          {bc.outcomes.map((o,i)=>(
            <div key={i} style={{display:"flex",gap:6,marginBottom:7,alignItems:"flex-start"}}>
              <span style={{fontSize:13,flexShrink:0}}>{o.icon}</span>
              <span style={{fontSize:11,color:"#d1fae5",lineHeight:1.4}}>{o.text}</span>
            </div>
          ))}
          <div style={{marginTop:10,padding:"8px 10px",background:"rgba(34,197,94,0.1)",borderRadius:8,fontSize:11,color:"#4ade80",lineHeight:1.4,fontStyle:"italic"}}>📊 {bc.stat}</div>
        </div>
        <div style={{background:"linear-gradient(135deg,#2d0a0a,#1a0808)",border:"1px solid #7f1d1d",borderRadius:14,padding:14}}>
          <div style={{fontSize:11,fontWeight:800,color:"#ef4444",textTransform:"uppercase",letterSpacing:0.8,marginBottom:6}}>{tx(lang,"worstCase")}</div>
          <div style={{fontSize:12,fontWeight:700,color:"#fca5a5",lineHeight:1.4,marginBottom:10}}>{wc.label}</div>
          {wc.outcomes.map((o,i)=>(
            <div key={i} style={{display:"flex",gap:6,marginBottom:7,alignItems:"flex-start"}}>
              <span style={{fontSize:13,flexShrink:0}}>{o.icon}</span>
              <span style={{fontSize:11,color:"#fee2e2",lineHeight:1.4}}>{o.text}</span>
            </div>
          ))}
          <div style={{marginTop:10,padding:"8px 10px",background:"rgba(239,68,68,0.1)",borderRadius:8,fontSize:11,color:"#f87171",lineHeight:1.4,fontStyle:"italic"}}>📊 {wc.stat}</div>
        </div>
      </div>);})()}
      <div style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:6}}>{tx(lang,"swipeProfiles")}</div>
    </div>
  );
}

// ── WRITE YOUR STORY ──────────────────────────────────────────────────────────
function WriteYourStory({profile,lang="en"}){
  const[story,setStory]=useState("");
  const[name,setName]=useState("");
  const[result,setResult]=useState(null);
  const[loading,setLoading]=useState(false);
  const[error,setError]=useState(false);
  const isEs=lang==="es";

  const generate=async()=>{
    setLoading(true);setError(false);
    try{
      const prompt=`You are LifeLens, created by Ms. Rosa Chavez — a veteran NYC public school teacher who has devoted her life to helping teenagers make better decisions. Write with her warmth, directness, and deep care for young people.

A teenager has shared their story. Create a personalized Shadow Self analysis. Respond ONLY with valid JSON — no markdown, no backticks, no preamble:
{
  "name": "${name||"You"}",
  "decision": "one clear sentence summarizing their core decision",
  "context": "2 warm, non-judgmental sentences about their situation that make them feel genuinely seen",
  "bestCase": {
    "label": "best path forward — one short empowering phrase",
    "outcomes": [
      {"icon": "💰", "text": "specific financial outcome with a real statistic"},
      {"icon": "🏥", "text": "specific health or wellbeing outcome"},
      {"icon": "💞", "text": "specific relationship or family outcome"},
      {"icon": "⚖️", "text": "specific practical or legal outcome"}
    ],
    "stat": "one powerful real statistic relevant to their situation and demographics"
  },
  "worstCase": {
    "label": "worst path — one honest short phrase",
    "outcomes": [
      {"icon": "💰", "text": "specific financial risk with a real statistic"},
      {"icon": "🏥", "text": "specific health or mental health risk"},
      {"icon": "💞", "text": "specific relationship or family risk"},
      {"icon": "⚖️", "text": "specific practical or legal risk"}
    ],
    "stat": "one sobering but real statistic"
  },
  "message": "One warm powerful sentence in Ms. Chavez's voice — like a handwritten note she would leave on a teenager's desk. Must start with either 'Remember:' or 'Dear ${name||"you"},'"
}

Teen profile: ${profile.race}, ${profile.gender}, ${profile.socioeconomic} background, ${profile.region}
Their story: ${story}`;

      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:prompt}]})});
      const data=await res.json();
      const raw=data.content?.find(b=>b.type==="text")?.text||"";
      const clean=raw.replace(/```json|```/g,"").trim();
      setResult(JSON.parse(clean));
    }catch(e){setError(true);}
    setLoading(false);
  };

  if(result&&!error){
    return(
      <div style={{paddingBottom:80}}>
        <div style={{background:"linear-gradient(135deg,#1a0a3d,#1e1040)",border:`1px solid ${C.border}`,borderRadius:16,padding:20,marginBottom:16,textAlign:"center"}}>
          <div style={{fontSize:36,marginBottom:8}}>🪞</div>
          <div style={{fontSize:18,fontWeight:900,color:C.accentLight,marginBottom:4}}>{tx(lang,"yourShadowSelf")}</div>
          <div style={{fontSize:14,color:C.accentBright}}>{result.name}</div>
        </div>
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:16,marginBottom:12}}>
          <div style={{fontSize:13,fontWeight:700,color:C.accentLight,marginBottom:6}}>{isEs?"Tu Decisión":"Your Decision"}</div>
          <div style={{fontSize:14,color:C.text,lineHeight:1.6}}>{result.decision}</div>
          <div style={{fontSize:13,color:C.muted,marginTop:8,lineHeight:1.6,fontStyle:"italic"}}>{result.context}</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
          <div style={{background:"linear-gradient(135deg,#052e16,#0d2818)",border:"1px solid #166534",borderRadius:14,padding:14}}>
            <div style={{fontSize:11,fontWeight:800,color:"#22c55e",textTransform:"uppercase",letterSpacing:0.8,marginBottom:6}}>{tx(lang,"bestCase")}</div>
            <div style={{fontSize:12,fontWeight:700,color:"#86efac",lineHeight:1.4,marginBottom:10}}>{result.bestCase?.label}</div>
            {result.bestCase?.outcomes?.map((o,i)=>(
              <div key={i} style={{display:"flex",gap:6,marginBottom:7,alignItems:"flex-start"}}>
                <span style={{fontSize:13,flexShrink:0}}>{o.icon}</span>
                <span style={{fontSize:11,color:"#d1fae5",lineHeight:1.4}}>{o.text}</span>
              </div>
            ))}
            <div style={{marginTop:10,padding:"8px 10px",background:"rgba(34,197,94,0.1)",borderRadius:8,fontSize:11,color:"#4ade80",lineHeight:1.4,fontStyle:"italic"}}>📊 {result.bestCase?.stat}</div>
          </div>
          <div style={{background:"linear-gradient(135deg,#2d0a0a,#1a0808)",border:"1px solid #7f1d1d",borderRadius:14,padding:14}}>
            <div style={{fontSize:11,fontWeight:800,color:"#ef4444",textTransform:"uppercase",letterSpacing:0.8,marginBottom:6}}>{tx(lang,"worstCase")}</div>
            <div style={{fontSize:12,fontWeight:700,color:"#fca5a5",lineHeight:1.4,marginBottom:10}}>{result.worstCase?.label}</div>
            {result.worstCase?.outcomes?.map((o,i)=>(
              <div key={i} style={{display:"flex",gap:6,marginBottom:7,alignItems:"flex-start"}}>
                <span style={{fontSize:13,flexShrink:0}}>{o.icon}</span>
                <span style={{fontSize:11,color:"#fee2e2",lineHeight:1.4}}>{o.text}</span>
              </div>
            ))}
            <div style={{marginTop:10,padding:"8px 10px",background:"rgba(239,68,68,0.1)",borderRadius:8,fontSize:11,color:"#f87171",lineHeight:1.4,fontStyle:"italic"}}>📊 {result.worstCase?.stat}</div>
          </div>
        </div>
        {result.message&&(
          <div style={{background:"linear-gradient(135deg,#1a0a3d,#1e1040)",border:`1px solid ${C.border}`,borderRadius:14,padding:18,marginBottom:14}}>
            <div style={{fontSize:12,color:C.accentBright,fontWeight:700,marginBottom:8,textTransform:"uppercase",letterSpacing:0.8}}>{tx(lang,"messageFrom")}</div>
            <div style={{fontSize:15,color:C.text,lineHeight:1.7,fontStyle:"italic"}}>"{result.message}"</div>
            <div style={{fontSize:12,color:C.muted,marginTop:10}}>— Ms. Chavez, LifeLens</div>
          </div>
        )}
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:16,marginBottom:14}}>
          <div style={{fontSize:13,fontWeight:700,color:C.accentLight,marginBottom:8}}>🗺️ {isEs?"Construye tu Hoja de Ruta":"Build Your Roadmap"}</div>
          <div style={{fontSize:13,color:C.muted,lineHeight:1.7}}>{isEs?"Explora los escenarios en la pestaña Escenarios, guarda los que se apliquen a ti, y tu Mapa de Vida los reunirá todos en tu hoja de ruta personal.":"Explore the scenarios in the Scenarios tab, save the ones that apply to you, and your Life Map will bring them all together into your personal roadmap."}</div>
        </div>
        <button onClick={()=>{setResult(null);setStory("");setName("");}} style={{width:"100%",background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"14px",color:"#ddd6fe",fontSize:14,cursor:"pointer",minHeight:50}}>{tx(lang,"tryAgain")}</button>
      </div>
    );
  }

  return(
    <div style={{paddingBottom:80}}>
      <div style={{background:"linear-gradient(135deg,#1a0a3d,#1e1040)",border:`1px solid ${C.border}`,borderRadius:16,padding:20,marginBottom:16}}>
        <div style={{fontSize:36,textAlign:"center",marginBottom:12}}>🪞</div>
        <div style={{fontSize:16,fontWeight:800,color:C.accentLight,marginBottom:10,textAlign:"center"}}>{tx(lang,"writeStoryTitle")}</div>
        <p style={{fontSize:13,color:"#ede9fe",lineHeight:1.8,margin:"0 0 12px",fontStyle:"italic"}}>{isEs?"Los datos generales son un punto de partida. Pero tu situación es única. Cuéntame lo que está pasando realmente en tu vida, y LifeLens creará una Sombra diseñada específicamente para ti.":"General data is a starting point. But your situation is unique. Tell me what's really going on in your life, and LifeLens will create a Shadow Self designed specifically for you — with best and worst outcomes based on your actual story."}</p>
        <p style={{fontSize:13,color:C.accentLight,lineHeight:1.8,margin:0,fontWeight:600}}>{isEs?"No hay respuestas incorrectas. Solo la tuya.":"There are no wrong answers. Only yours."}</p>
      </div>
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:16,marginBottom:16}}>
        <div style={{fontSize:12,fontWeight:700,color:C.accentLight,marginBottom:12,textTransform:"uppercase",letterSpacing:0.8}}>📋 {isEs?"Cómo funciona":"How it works"}</div>
        {[
          {step:"1",icon:"✍️",en:"Write your story below — the decision you're facing, what's holding you back, what you hope for.",es:"Escribe tu historia — la decisión que enfrentas, qué te detiene, qué esperas."},
          {step:"2",icon:"🪞",en:"LifeLens generates your personal Shadow Self — best case and worst case outcomes grounded in real data.",es:"LifeLens genera tu Sombra personal — mejores y peores resultados basados en datos reales."},
          {step:"3",icon:"🗺️",en:"Explore the Scenarios tab and tap \"+ Save to Journal\" on any decision that applies to your life.",es:"Explora la pestaña Escenarios y toca \"+ Guardar en Diario\" en cualquier decisión que aplique."},
          {step:"4",icon:"🌐",en:"Your Life Map tab collects all your saved decisions into a single personal risk roadmap — your plan.",es:"Tu pestaña Mapa de Vida reúne todas tus decisiones guardadas en una hoja de ruta de riesgo personal."},
        ].map(({step,icon,en,es})=>(
          <div key={step} style={{display:"flex",gap:12,marginBottom:12,alignItems:"flex-start"}}>
            <div style={{width:24,height:24,borderRadius:"50%",background:C.accent,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:"white",flexShrink:0,marginTop:1}}>{step}</div>
            <div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
              <span style={{fontSize:16,flexShrink:0}}>{icon}</span>
              <span style={{fontSize:13,color:C.muted,lineHeight:1.6}}>{isEs?es:en}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:18,marginBottom:12}}>
        <div style={{fontSize:13,color:C.muted,marginBottom:6}}>{tx(lang,"yourName")}</div>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder={tx(lang,"namePlaceholder")} style={{width:"100%",background:C.deep,border:`1px solid ${C.border}`,borderRadius:10,padding:"12px 14px",color:C.text,fontSize:15,outline:"none",boxSizing:"border-box",marginBottom:16,fontFamily:"inherit"}}/>
        <div style={{fontSize:13,color:C.muted,marginBottom:6}}>{isEs?"Tu historia":"Your story"}</div>
        <textarea value={story} onChange={e=>setStory(e.target.value)} placeholder={tx(lang,"writeStoryPlaceholder")} style={{width:"100%",background:C.deep,border:`1px solid ${C.border}`,borderRadius:10,padding:"14px",color:C.text,fontSize:14,minHeight:160,resize:"vertical",outline:"none",boxSizing:"border-box",fontFamily:"inherit",lineHeight:1.6}}/>
        {error&&<div style={{color:"#f87171",fontSize:13,marginTop:8}}>{isEs?"Algo salió mal. Inténtalo de nuevo.":"Something went wrong. Please try again."}</div>}
        <button onClick={generate} disabled={!story.trim()||loading} style={{marginTop:14,width:"100%",background:story.trim()&&!loading?`linear-gradient(135deg,${C.accent},#9333ea)`:"#2d1a4a",border:"none",borderRadius:12,padding:"16px",color:story.trim()&&!loading?"white":C.muted,fontSize:15,fontWeight:700,cursor:story.trim()&&!loading?"pointer":"not-allowed",minHeight:52}}>
          {loading?<span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10}}><span style={{width:18,height:18,border:"2px solid rgba(255,255,255,0.3)",borderTop:"2px solid white",borderRadius:"50%",display:"inline-block",animation:"spin 1s linear infinite"}}></span>{tx(lang,"generating")}</span>:tx(lang,"generateStory")}
        </button>
      </div>
    </div>
  );
}

// ── JOURNAL TAB ───────────────────────────────────────────────────────────────
function JournalTab({saved,onUnsave,lang="en",profile=null}){
  const savedScenarios=SCENARIOS.filter(s=>saved.includes(s.id));
  return(
    <div style={{paddingBottom:80}}>
      <ShadowSelf lang={lang} profile={profile}/>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div style={{fontSize:15,fontWeight:800,color:C.accentLight}}>{tx(lang,"savedDecisions")}</div>
        <span style={{fontSize:12,color:C.muted}}>{savedScenarios.length} saved</span>
      </div>
      {savedScenarios.length===0
        ?<div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:24,textAlign:"center"}}>
          <div style={{fontSize:36,marginBottom:10}}>📭</div>
          <div style={{color:"#ddd6fe",fontSize:14,lineHeight:1.6}}>{tx(lang,"noSaved")}<br/>{tx(lang,"tapSave")}</div>
        </div>
        :savedScenarios.map(sc=>{
          const{label,color}=getRiskLevel(sc.riskScore,lang);
          return(
            <div key={sc.id} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:16,marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <div style={{display:"flex",gap:10,alignItems:"center"}}>
                  <span style={{fontSize:24}}>{sc.icon}</span>
                  <div>
                    <div style={{fontWeight:700,color:C.text,fontSize:14}}>{lang==="es"&&sc.titleEs?sc.titleEs:sc.title}</div>
                    <div style={{fontSize:11,color,fontWeight:700,marginTop:2}}>{label}</div>
                  </div>
                </div>
                <button onClick={()=>onUnsave(sc.id)} style={{background:"none",border:`1px solid ${C.border}`,borderRadius:8,padding:"4px 10px",color:C.muted,fontSize:11,cursor:"pointer"}}>{tx(lang,"remove")}</button>
              </div>
              <div style={{height:3,background:C.deep,borderRadius:2}}>
                <div style={{height:"100%",width:`${sc.riskScore}%`,background:`linear-gradient(90deg,#22c55e,${color})`,borderRadius:2}}/>
              </div>
            </div>
          );
        })
      }
    </div>
  );
}

// ── LIFE MAP TAB ──────────────────────────────────────────────────────────────
function LifeMapTab({saved,lang="en"}){
  const savedSet=new Set(saved);
  return(
    <div style={{paddingBottom:80}}>
      <div style={{marginBottom:16}}>
        <div style={{fontSize:15,fontWeight:800,color:C.accentLight,marginBottom:4}}>{tx(lang,"lifeMap")}</div>
        <div style={{fontSize:13,color:C.muted,lineHeight:1.5}}>{tx(lang,"lifeMapSub")}</div>
      </div>
      {saved.length===0&&(
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:24,textAlign:"center",marginBottom:16}}>
          <div style={{fontSize:36,marginBottom:10}}>🗺️</div>
          <div style={{color:"#ddd6fe",fontSize:14,lineHeight:1.6}}>{lang==="es"?"Tu Mapa de Vida está vacío.":"Your Life Map is empty."}<br/>{lang==="es"?<span>Guarda escenarios en la pestaña <strong style={{color:C.accentLight}}>Escenarios</strong> para construir tu hoja de ruta personal.</span>:<span>Save scenarios in the <strong style={{color:C.accentLight}}>Scenarios</strong> tab to build your personal roadmap.</span>}</div>
        </div>
      )}
      <RiskLegend lang={lang}/>
      {CATEGORIES.map(cat=>{
        const catScenarios=SCENARIOS.filter(s=>s.category===cat.id);
        return(
          <div key={cat.id} style={{marginBottom:20}}>
            <div style={{fontSize:13,fontWeight:700,color:C.muted,marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>{cat.icon} {lang==="es"?cat.labelEs:cat.label}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {catScenarios.map(sc=>{
                const isSaved=savedSet.has(sc.id);
                const{label,color}=getRiskLevel(sc.riskScore,lang);
                return(
                  <div key={sc.id} style={{background:isSaved?C.card:C.deep,border:`1px solid ${isSaved?color:C.border}`,borderRadius:12,padding:12,opacity:isSaved?1:0.4,transition:"all 0.2s"}}>
                    <div style={{fontSize:22,marginBottom:4}}>{sc.icon}</div>
                    <div style={{fontSize:12,fontWeight:700,color:isSaved?C.text:C.muted,lineHeight:1.3,marginBottom:6}}>{lang==="es"&&sc.titleEs?sc.titleEs:sc.title}</div>
                    <div style={{height:3,background:C.deep,borderRadius:2,marginBottom:5}}>
                      <div style={{height:"100%",width:isSaved?`${sc.riskScore}%`:"0%",background:`linear-gradient(90deg,#22c55e,${color})`,borderRadius:2,transition:"width 0.5s"}}/>
                    </div>
                    <div style={{fontSize:10,color:isSaved?color:C.muted,fontWeight:700}}>{isSaved?label:tx(lang,"notExplored")}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      {saved.length>0&&(()=>{
        const savedScenarios=SCENARIOS.filter(s=>savedSet.has(s.id));
        const avg=Math.round(savedScenarios.reduce((a,b)=>a+b.riskScore,0)/savedScenarios.length);
        const{label,color}=getRiskLevel(avg,lang);
        const highest=savedScenarios.reduce((a,b)=>a.riskScore>b.riskScore?a:b);
        const lowest=savedScenarios.reduce((a,b)=>a.riskScore<b.riskScore?a:b);
        return(
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:16,marginTop:8}}>
            <div style={{fontSize:13,fontWeight:700,color:C.accentLight,marginBottom:10}}>{tx(lang,"riskSummary")}</div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
              <span style={{fontSize:13,color:C.muted}}>{tx(lang,"avgRisk")}</span>
              <span style={{fontSize:13,fontWeight:700,color}}>{label}</span>
            </div>
            <div style={{height:6,background:C.deep,borderRadius:3,overflow:"hidden",marginBottom:12}}>
              <div style={{height:"100%",width:`${avg}%`,background:`linear-gradient(90deg,#22c55e,${color})`,borderRadius:3}}/>
            </div>
            <div style={{display:"flex",gap:10}}>
              <div style={{flex:1,background:C.deep,borderRadius:10,padding:"10px 12px"}}>
                <div style={{fontSize:10,color:"#22c55e",fontWeight:700,marginBottom:3}}>{tx(lang,"lowestRisk")}</div>
                <div style={{fontSize:12,color:C.text,fontWeight:600}}>{lowest.icon} {lang==="es"&&lowest.titleEs?lowest.titleEs:lowest.title}</div>
              </div>
              <div style={{flex:1,background:C.deep,borderRadius:10,padding:"10px 12px"}}>
                <div style={{fontSize:10,color:"#ef4444",fontWeight:700,marginBottom:3}}>{tx(lang,"highestRisk")}</div>
                <div style={{fontSize:12,color:C.text,fontWeight:600}}>{highest.icon} {lang==="es"&&highest.titleEs?highest.titleEs:highest.title}</div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

// ── SCENARIO EXPLORER ─────────────────────────────────────────────────────────
function ScenarioExplorer({profile,saved,onSave,lang="en"}){
  const[cat,setCat]=useState("education");
  const[selected,setSelected]=useState(null);
  const[showDemo,setShowDemo]=useState(true);

  if(selected){
    const sc=selected;
    const{label,color,sentence}=getRiskLevel(sc.riskScore,lang);
    const isSaved=saved.includes(sc.id);
    return(
      <div style={{paddingBottom:80}}>
        <button onClick={()=>setSelected(null)} style={{background:"none",border:"none",color:C.accentLight,fontSize:15,cursor:"pointer",marginBottom:14,padding:"10px 0",minHeight:44}}>{tx(lang,"back")}</button>
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:18,marginBottom:12}}>
          <div style={{fontSize:32,marginBottom:4}}>{sc.icon}</div>
          <h2 style={{color:C.text,fontSize:20,fontWeight:800,margin:"0 0 4px"}}>{lang==="es"&&sc.titleEs?sc.titleEs:sc.title}</h2>
          <div style={{color:C.muted,fontSize:13,marginBottom:14}}>{lang==="es"&&sc.taglineEs?sc.taglineEs:sc.tagline}</div>
          <span style={{fontSize:18,fontWeight:900,color}}>{label}</span>
          <div style={{height:6,background:C.deep,borderRadius:3,overflow:"hidden",margin:"6px 0 8px"}}>
            <div style={{height:"100%",width:`${sc.riskScore}%`,background:`linear-gradient(90deg,#22c55e,${color})`,borderRadius:3}}/>
          </div>
          <div style={{fontSize:13,color:C.muted,lineHeight:1.5,fontStyle:"italic",marginBottom:12}}>{sentence}</div>
          <RiskLegend compact lang={lang}/>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <button onClick={()=>onSave(sc.id)} style={{background:isSaved?"rgba(34,197,94,0.15)":C.accent,border:`1px solid ${isSaved?"#22c55e":C.accent}`,borderRadius:10,padding:"8px 16px",color:isSaved?"#22c55e":"white",fontSize:13,fontWeight:700,cursor:"pointer",minHeight:40}}>
              {isSaved?tx(lang,"savedToJournal"):tx(lang,"saveToJournal")}
            </button>
            <button onClick={()=>setShowDemo(s=>!s)} style={{background:showDemo?C.accent:"#2d1a4a",border:"none",borderRadius:10,padding:"8px 16px",color:"white",fontSize:13,cursor:"pointer",minHeight:40}}>
              {showDemo?tx(lang,"demoOn"):tx(lang,"demoOff")}
            </button>
          </div>
        </div>
        {OUTCOME_TYPES.map(t=>(
          <OutcomeBlock key={t.id} typeId={t.id} outcome={sc.outcomes[t.id]} profile={profile} showDemo={showDemo} lang={lang}/>
        ))}
        <div style={{background:"linear-gradient(135deg,#1a0a3d,#1e1040)",border:`1px solid ${C.border}`,borderRadius:14,padding:18,marginBottom:12}}>
          <div style={{fontSize:15,fontWeight:700,color:C.accentBright,marginBottom:12}}>{tx(lang,"pathsBeatOdds")}</div>
          {sc.beatsOdds.map((tip,i)=>(
            <div key={i} style={{display:"flex",gap:10,marginBottom:10}}>
              <span style={{color:"#22c55e",flexShrink:0,fontSize:16}}>✓</span>
              <span style={{color:"#ede9fe",fontSize:14,lineHeight:1.5}}>{tip}</span>
            </div>
          ))}
        </div>
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:18,marginBottom:14}}>
          <div style={{fontSize:15,fontWeight:700,color:C.accentLight,marginBottom:12}}>{tx(lang,"resources")}</div>
          {sc.resources.map((r,i)=>(
            <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" style={{display:"flex",gap:12,alignItems:"flex-start",background:C.deep,border:`1px solid ${C.border}`,borderRadius:12,padding:14,marginBottom:8,textDecoration:"none"}}>
              <span style={{fontSize:22,flexShrink:0}}>{r.emoji}</span>
              <div>
                <div style={{fontSize:14,fontWeight:700,color:C.accentBright,marginBottom:3}}>{r.label} ↗</div>
                <div style={{fontSize:12,color:C.muted,lineHeight:1.4}}>{r.desc}</div>
              </div>
            </a>
          ))}
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          <span style={{fontSize:11,color:C.muted}}>{tx(lang,"sources")}</span>
          {sc.sources.map((s,i)=><span key={i} style={{fontSize:11,color:C.muted,background:C.card,padding:"3px 9px",borderRadius:8}}>{s}</span>)}
        </div>
      </div>
    );
  }

  return(
    <div>
      <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:8,marginBottom:14,WebkitOverflowScrolling:"touch",scrollbarWidth:"none"}}>
        {CATEGORIES.map(c=>(
          <button key={c.id} onClick={()=>setCat(c.id)} style={{flexShrink:0,background:cat===c.id?C.accent:C.card,border:`1px solid ${cat===c.id?C.accent:C.border}`,borderRadius:24,padding:"10px 18px",color:cat===c.id?"white":C.muted,fontSize:14,fontWeight:cat===c.id?700:400,cursor:"pointer",whiteSpace:"nowrap",minHeight:44}}>
            {c.icon} {lang==="es"?c.labelEs:c.label}
          </button>
        ))}
      </div>
      <RiskLegend lang={lang}/>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {SCENARIOS.filter(s=>s.category===cat).map(sc=>{
          const{label,color}=getRiskLevel(sc.riskScore,lang);
          const isSaved=saved.includes(sc.id);
          return(
            <div key={sc.id} onClick={()=>setSelected(sc)} style={{background:C.card,border:`1px solid ${isSaved?color:C.border}`,borderRadius:16,padding:18,cursor:"pointer"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{display:"flex",gap:12,alignItems:"center"}}>
                  <span style={{fontSize:28}}>{sc.icon}</span>
                  <div>
                    <div style={{fontWeight:700,color:C.text,fontSize:15}}>{lang==="es"&&sc.titleEs?sc.titleEs:sc.title}</div>
                    <div style={{color:C.muted,fontSize:12,marginTop:3}}>{lang==="es"&&sc.taglineEs?sc.taglineEs:sc.tagline}</div>
                  </div>
                </div>
                <div style={{textAlign:"right",flexShrink:0,marginLeft:10}}>
                  <div style={{fontSize:15,fontWeight:900,color}}>{label}</div>
                  {isSaved&&<div style={{fontSize:10,color:"#22c55e",marginTop:2}}>✓ Saved</div>}
                </div>
              </div>
              <div style={{marginTop:12,height:4,background:C.deep,borderRadius:2}}>
                <div style={{height:"100%",width:`${sc.riskScore}%`,background:`linear-gradient(90deg,#22c55e,${color})`,borderRadius:2}}/>
              </div>
              <div style={{marginTop:10,display:"flex",alignItems:"center"}}>
                {OUTCOME_TYPES.map(t=><span key={t.id} style={{fontSize:14,opacity:0.5,marginRight:6}}>{t.icon}</span>)}
                <span style={{marginLeft:"auto",fontSize:12,color:"#f0abfc",fontWeight:800,letterSpacing:"0.8px"}}>{tx(lang,"tapExplore")}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── PERSONAL ASSESSMENT ───────────────────────────────────────────────────────
function PersonalAssessment({profile,lang="en"}){
  const[step,setStep]=useState(0);
  const[answers,setAnswers]=useState({});
  const[current,setCurrent]=useState("");
  const[result,setResult]=useState(null);
  const[loading,setLoading]=useState(false);
  const q=ASSESSMENT_QUESTIONS[step-1];
  const handleNext=()=>{
    const updated={...answers,[q.id]:current};
    setAnswers(updated);setCurrent("");
    if(step<ASSESSMENT_QUESTIONS.length){setStep(s=>s+1);}
    else{setStep(7);runAnalysis(updated);}
  };
  const runAnalysis=async(a)=>{
    setLoading(true);
    try{
      const prompt=`You are LifeLens, an empowering life decision advisor for young adults. Use real demographic data to give honest, personalized insights with paths forward.
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
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:prompt}]})});
      const data=await res.json();
      setResult(data.content?.find(b=>b.type==="text")?.text||"Unable to generate. Please try again.");
    }catch{setResult("Error generating analysis. Please try again.");}
    setLoading(false);
  };
  const renderText=(text)=>text.split("\n").map((line,i)=>{
    if(line.startsWith("## "))return(<h3 key={i} style={{color:C.accentLight,fontSize:13,fontWeight:700,marginTop:18,marginBottom:8,textTransform:"uppercase",letterSpacing:0.5}}>{line.slice(3)}</h3>);
    if(line.startsWith("- ")||line.startsWith("• "))return(<div key={i} style={{display:"flex",gap:9,marginBottom:7}}><span style={{color:"#22c55e",flexShrink:0}}>•</span><span style={{color:"#ede9fe",fontSize:14,lineHeight:1.55}}>{line.replace(/^[-•]\s/,"")}</span></div>);
    if(!line.trim())return(<div key={i} style={{height:6}}/>);
    return(<p key={i} style={{color:"#ede9fe",fontSize:14,lineHeight:1.65,margin:"0 0 6px"}}>{line}</p>);
  });
  if(step===0)return(
    <div style={{textAlign:"center",padding:"40px 16px",paddingBottom:80}}>
      <div style={{fontSize:48,marginBottom:14}}>🔍</div>
      <h2 style={{color:C.text,fontSize:21,fontWeight:800,marginBottom:12}}>{tx(lang,"assessment")}</h2>
      <p style={{color:"#ddd6fe",fontSize:14,lineHeight:1.7,marginBottom:28,maxWidth:340,margin:"0 auto 28px"}}>{tx(lang,"assessmentSub")}</p>
      <button onClick={()=>setStep(1)} style={{background:`linear-gradient(135deg,${C.accent},#9333ea)`,border:"none",borderRadius:14,padding:"16px 36px",color:"white",fontSize:16,fontWeight:700,cursor:"pointer",minHeight:52}}>{tx(lang,"startAssessment")}</button>
    </div>
  );
  if(step<=ASSESSMENT_QUESTIONS.length){
    const progress=(step/ASSESSMENT_QUESTIONS.length)*100;
    return(
      <div style={{paddingBottom:80}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
          <span style={{fontSize:13,color:C.muted}}>{tx(lang,"question")} {step} {tx(lang,"of")} {ASSESSMENT_QUESTIONS.length}</span>
          <span style={{fontSize:13,color:C.accentLight}}>{Math.round(progress)}%</span>
        </div>
        <div style={{height:4,background:C.card,borderRadius:2,marginBottom:22}}>
          <div style={{height:"100%",width:`${progress}%`,background:C.accent,borderRadius:2}}/>
        </div>
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:20}}>
          <h3 style={{color:C.text,fontSize:17,fontWeight:600,marginBottom:20,lineHeight:1.4}}>{lang==="es"&&q.labelEs?q.labelEs:q.label}</h3>
          {q.type==="text"
            ?<textarea value={current} onChange={e=>setCurrent(e.target.value)} placeholder={lang==="es"&&q.placeholderEs?q.placeholderEs:q.placeholder} style={{width:"100%",background:C.deep,border:`1px solid ${C.border}`,borderRadius:12,padding:"14px",color:C.text,fontSize:16,minHeight:100,resize:"vertical",outline:"none",boxSizing:"border-box",fontFamily:"inherit"}}/>
            :((lang==="es"&&q.optionsEs?q.optionsEs:q.options).map((opt,oi)=>{const enOpt=q.options[oi];return(<button key={enOpt} onClick={()=>setCurrent(enOpt)} style={{display:"block",width:"100%",background:current===enOpt?"rgba(124,58,237,0.2)":C.deep,border:`1px solid ${current===enOpt?C.accent:C.border}`,borderRadius:12,padding:"14px 16px",color:current===enOpt?C.accentLight:C.muted,fontSize:15,cursor:"pointer",textAlign:"left",fontWeight:current===enOpt?700:400,marginBottom:8,minHeight:52}}>{opt}</button>);}))
          }
          <button onClick={handleNext} disabled={!current.trim()} style={{marginTop:12,width:"100%",background:current.trim()?`linear-gradient(135deg,${C.accent},#9333ea)`:"#2d1a4a",border:"none",borderRadius:12,padding:"16px",color:current.trim()?"white":C.muted,fontSize:16,fontWeight:700,cursor:current.trim()?"pointer":"not-allowed",minHeight:52}}>
            {step===ASSESSMENT_QUESTIONS.length?tx(lang,"generateAnalysis"):tx(lang,"next")}
          </button>
        </div>
      </div>
    );
  }
  return(
    <div style={{paddingBottom:80}}>
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:18,marginBottom:12,textAlign:"center"}}>
        <div style={{fontSize:30,marginBottom:6}}>🔮</div>
        <h2 style={{color:C.accentLight,fontSize:18,fontWeight:800,margin:0}}>{tx(lang,"yourAnalysis")}</h2>
        <div style={{color:C.muted,fontSize:12,marginTop:4}}>{lang==="es"?getGenderEs(profile.gender):profile.gender} · {lang==="es"?getRaceEs(profile.race):profile.race} · {profile.socioeconomic} · {profile.region}</div>
      </div>
      {loading
        ?<div style={{textAlign:"center",padding:"48px 20px"}}><div style={{width:38,height:38,border:`3px solid ${C.card}`,borderTop:`3px solid ${C.accent}`,borderRadius:"50%",margin:"0 auto 14px",animation:"spin 1s linear infinite"}}/><div style={{color:"#ddd6fe",fontSize:14}}>{tx(lang,"analyzing")}</div></div>
        :<div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:20}}>
          {renderText(result||"")}
          <button onClick={()=>{setStep(0);setAnswers({});setCurrent("");setResult(null);}} style={{marginTop:20,width:"100%",background:C.deep,border:`1px solid ${C.border}`,borderRadius:12,padding:"14px",color:"#ddd6fe",fontSize:14,cursor:"pointer",minHeight:50}}>{tx(lang,"newAssessment")}</button>
        </div>
      }
    </div>
  );
}

// ── ONBOARDING ────────────────────────────────────────────────────────────────
function Onboarding({onComplete,lang,setLang}){
  const[step,setStep]=useState(0);
  const[profile,setProfile]=useState({race:"",gender:"",socioeconomic:"",region:""});
  const fields=[
    {key:"race",label:"How do you identify racially or ethnically?",labelEs:"¿Cómo te identificas racial o étnicamente?",icon:"🌍",options:RACES,optionsEs:RACES_ES},
    {key:"gender",label:"How do you identify?",labelEs:"¿Cómo te identificas?",icon:"🧬",options:GENDERS,optionsEs:GENDERS_ES},
    {key:"socioeconomic",label:"What best describes your economic background?",labelEs:"¿Qué describe mejor tu contexto económico?",icon:"💵",options:SOCIO,optionsEs:SOCIO_ES},
    {key:"region",label:"What type of area do you live in?",labelEs:"¿En qué tipo de área vives?",icon:"📍",options:REGIONS,optionsEs:REGIONS_ES},
  ];
  const f=fields[step-1];
  const pick=(val)=>{
    const updated={...profile,[f?.key]:val};
    setProfile(updated);
    if(step<fields.length){setTimeout(()=>setStep(s=>s+1),180);}
    else{setTimeout(()=>onComplete(updated),180);}
  };
  return(
    <div style={{background:C.bg,minHeight:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <div style={{fontSize:48,marginBottom:10}}>🧭</div>
        <h1 style={{color:C.text,fontSize:26,fontWeight:900,margin:0}}>LifeLens</h1>
        <p style={{color:C.muted,fontSize:13,marginTop:6}}>{tx(lang,"appTagline")}</p>
        <div style={{display:"flex",gap:8,justifyContent:"center",marginTop:12}}>
          <button onClick={()=>setLang("en")} style={{background:lang==="en"?C.accent:"#2d1a4a",border:"none",borderRadius:20,padding:"6px 16px",color:"white",fontSize:13,fontWeight:lang==="en"?700:400,cursor:"pointer"}}>🇺🇸 EN</button>
          <button onClick={()=>setLang("es")} style={{background:lang==="es"?C.accent:"#2d1a4a",border:"none",borderRadius:20,padding:"6px 16px",color:"white",fontSize:13,fontWeight:lang==="es"?700:400,cursor:"pointer"}}>🇪🇸 ES</button>
        </div>
      </div>
      {step===0
        ?<div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:18,padding:26,maxWidth:400,width:"100%",textAlign:"center"}}>
          <p style={{color:"#ede9fe",fontSize:15,lineHeight:1.75,marginBottom:22}}>{tx(lang,"onboardingIntro")}</p>
          <div style={{color:C.muted,fontSize:13,marginBottom:22}}>{tx(lang,"questions4")}</div>
          <button onClick={()=>setStep(1)} style={{background:`linear-gradient(135deg,${C.accent},#9333ea)`,border:"none",borderRadius:14,padding:"16px",width:"100%",color:"white",fontSize:16,fontWeight:700,cursor:"pointer",minHeight:52,boxShadow:"0 4px 20px rgba(124,58,237,0.4)"}}>{tx(lang,"getStarted")}</button>
          <div style={{marginTop:14,fontSize:12,color:C.muted}}>{tx(lang,"onboardingPrivacy")}</div>
        </div>
        :<>
          <div style={{display:"flex",gap:8,marginBottom:22}}>
            {fields.map((_,i)=><div key={i} style={{width:9,height:9,borderRadius:5,background:i<step?C.accent:C.card}}/>)}
          </div>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:18,padding:26,maxWidth:400,width:"100%"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <span style={{fontSize:13,color:C.muted}}>{tx(lang,"step")} {step} {tx(lang,"of")} {fields.length}</span>
              <span style={{fontSize:13,color:C.accentLight,fontWeight:700}}>{Math.round((step/fields.length)*100)}%</span>
            </div>
            <div style={{fontSize:26,textAlign:"center",marginBottom:10}}>{f.icon}</div>
            <h2 style={{color:C.text,fontSize:17,fontWeight:700,textAlign:"center",marginBottom:18,lineHeight:1.4}}>{lang==="es"?f.labelEs:f.label}</h2>
            {f.options.map((opt,oi)=><button key={opt} onClick={()=>pick(opt)} style={{display:"block",width:"100%",background:profile[f.key]===opt?"rgba(124,58,237,0.2)":C.deep,border:`1px solid ${profile[f.key]===opt?C.accent:C.border}`,borderRadius:12,padding:"14px 16px",color:profile[f.key]===opt?C.accentLight:C.muted,fontSize:15,fontWeight:profile[f.key]===opt?700:400,cursor:"pointer",textAlign:"left",marginBottom:10,minHeight:52}}>{lang==="es"&&f.optionsEs?f.optionsEs[oi]:opt}</button>)}
          </div>
        </>
      }
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function LifeLens(){
  const[unlocked,setUnlocked]=useState(()=>{try{return sessionStorage.getItem("ll_unlocked")==="true";}catch{return false;}});
  const[profile,setProfile]=useState(null);
  const[showBridge,setShowBridge]=useState(false);
  const[tab,setTab]=useState("explorer");
  const[saved,setSaved]=useState([]);
  const[lang,setLang]=useState("en");

  useEffect(()=>{
    (async()=>{
      try{const r=await window.storage.get("lifelens_saved_v3");if(r?.value)setSaved(JSON.parse(r.value));}catch{}
      try{const r=await window.storage.get("lifelens_lang");if(r?.value)setLang(r.value);}catch{}
    })();
  },[]);

  const handleSave=async(id)=>{
    const updated=saved.includes(id)?saved.filter(x=>x!==id):[...saved,id];
    setSaved(updated);
    try{await window.storage.set("lifelens_saved_v3",JSON.stringify(updated));}catch{}
  };

  const handleLang=async(l)=>{
    setLang(l);
    try{await window.storage.set("lifelens_lang",l);}catch{}
  };

  const handleOnboardingComplete=(p)=>{
    setProfile(p);
    setShowBridge(true);
  };

  const handleUnlock=()=>{
    try{sessionStorage.setItem("ll_unlocked","true");}catch{}
    setUnlocked(true);
  };

  if(!unlocked)return(<PasswordGate onUnlock={handleUnlock} lang={lang}/>);
  if(!profile)return(<Onboarding onComplete={handleOnboardingComplete} lang={lang} setLang={handleLang}/>);
  if(showBridge)return(<WelcomeBridge onReady={()=>setShowBridge(false)} lang={lang}/>);

  const TABS=[
    {id:"explorer",icon:"🗺️"},
    {id:"assessment",icon:"🔍"},
    {id:"journal",icon:"📓"},
    {id:"lifemap",icon:"🌐"},
    {id:"story",icon:"✍️"},
  ];

  return(
    <div style={{background:C.bg,minHeight:"100%",color:C.text,fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>
      <div style={{background:C.card,borderBottom:`1px solid ${C.border}`,padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        {/* Logo — tapping goes home to Scenarios */}
        <div onClick={()=>setTab("explorer")} style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}}>
          <span style={{fontSize:20}}>🧭</span>
          <div>
            <div style={{fontWeight:900,fontSize:18,color:C.accentLight,lineHeight:1.1}}>LifeLens</div>
            <div style={{fontSize:10,color:C.accent,fontWeight:600,letterSpacing:"0.3px"}}>{lang==="es"?"toca para ir al inicio":"tap to go home"}</div>
          </div>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <button onClick={()=>handleLang(lang==="en"?"es":"en")} style={{background:"#2d1a4a",border:`1px solid ${C.border}`,borderRadius:20,padding:"4px 12px",color:C.accentLight,fontSize:12,fontWeight:700,cursor:"pointer"}}>
            {lang==="en"?"🇪🇸 ES":"🇺🇸 EN"}
          </button>
          <div style={{width:1,height:16,background:C.border}}/>
          <span style={{fontSize:11,color:C.muted}}>{lang==="es"?getRaceEs(profile.race):profile.race}</span>
          <button onClick={()=>{setProfile(null);setShowBridge(false);}} style={{background:"none",border:`1px solid ${C.border}`,borderRadius:8,padding:"4px 10px",color:C.muted,fontSize:11,cursor:"pointer",display:"flex",alignItems:"center",gap:4}}>
            ✏️ {tx(lang,"editProfile")}
          </button>
        </div>
      </div>
      <div style={{maxWidth:600,margin:"0 auto",padding:"16px 14px"}}>
        {tab==="explorer"&&<ScenarioExplorer profile={profile} saved={saved} onSave={handleSave} lang={lang}/>}
        {tab==="assessment"&&<PersonalAssessment profile={profile} lang={lang}/>}
        {tab==="journal"&&<JournalTab saved={saved} onUnsave={handleSave} lang={lang} profile={profile}/>}
        {tab==="lifemap"&&<LifeMapTab saved={saved} lang={lang}/>}
        {tab==="story"&&<WriteYourStory profile={profile} lang={lang}/>}
      </div>
      <div style={{position:"fixed",bottom:0,left:0,right:0,background:C.card,borderTop:`1px solid ${C.border}`,display:"flex",zIndex:100}}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,background:"none",border:"none",borderTop:tab===t.id?`3px solid ${C.accent}`:"3px solid transparent",padding:"8px 2px 6px",color:tab===t.id?C.accentLight:C.muted,fontSize:10,fontWeight:tab===t.id?700:400,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2,minHeight:54}}>
            <span style={{fontSize:17}}>{t.icon}</span>
            {tx(lang,`tabs.${t.id}`)}
          </button>
        ))}
      </div>
      <style>{`html,body,#root{margin:0;padding:0;height:100%;}*{box-sizing:border-box;-webkit-tap-highlight-color:transparent;}textarea:focus,input:focus{border-color:${C.accent}!important;outline:none;}@keyframes spin{to{transform:rotate(360deg)}}::-webkit-scrollbar{display:none;}`}</style>
    </div>
  );
}

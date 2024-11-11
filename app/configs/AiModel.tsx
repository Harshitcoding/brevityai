const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run() {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "A Home Office artificial intelligence tool which proposes enforcement action against adult and child migrants could make it too easy for officials to rubberstamp automated life-changing decisions, campaigners have said.\n\nAs new details of the AI-powered immigration enforcement system emerged, critics called it a “robo-caseworker” that could “encode injustices” because an algorithm is involved in shaping decisions, including returning people to their home countries.\n\nThe government insists it delivers efficiencies by prioritising work and that a human remains responsible for each decision. It is being used amid a rising caseload of asylum seekers who are subject to removal action, currently about 41,000 people.\n\nMigrant rights campaigners called for the Home Office to withdraw the system, claiming it was “technology being used to make cruelty and harm more efficient”.\n\nA glimpse into the workings of the largely opaque system has become possible after a year-long freedom of information battle, in which redacted manuals and impact assessments were released to the campaign group Privacy International. They also revealed that people whose cases are being processed by the algorithm are not specifically told that AI is involved.\n\nThe system is one of several AI programmes UK public authorities are deploying as officials seek greater speed and efficiency. There are calls for greater transparency about government AI use in fields ranging from health to welfare.\n\nThe secretary of state for science, Peter Kyle, said AI had “incredible potential to improve our public services … but, in order to take full advantage, we need to build trust in these systems”.\n\nThe Home Office disclosures show the Identify and Prioritise Immigration Cases (IPIC) system is fed an array of personal information about people who are the subject of potential enforcement action, including biometric data, ethnicity and health markers and data about criminal convictions.\n\nThe purpose is “to create an easier, faster and more effective way for immigration enforcement to identify, prioritise and coordinate the services/interventions needed to manage its caseload”, the documents state.\n\nBut Privacy International said it feared the system was set up in a way that would lead to human officials “rubberstamping” the algorithm’s recommendations for action on a case “because it’s so much easier … than to look critically at a recommendation and reject it”.\n\nFor officials to reject a proposed decision on “returns” – sending people back to their home country – they must give a written explanation and tick boxes relating to the reasons. But to accept the computer’s verdict, no explanation is required and the official clicks one button marked “accept’ and confirms the case has been updated on other Home Office systems, the training manuals show.\n\nAsked if this introduced a bias in favour of accepting the AI decision, the Home Office declined to comment.\n\nOfficials describe IPIC as a rules-based workflow tool that delivers efficiencies for immigration enforcement by recommending to caseworkers the next case or action they should consider. They stressed that every recommendation made in the IPIC system was reviewed by a caseworker who was required to weigh it on its individual merits. The system is also being deployed on cases of EU nationals seeking to remain in the UK under the EU settlement scheme.\n\nJonah Mendelsohn, a lawyer at Privacy International, said the Home Office tool could affect the lives of hundreds of thousands of people.\n\n“Anyone going through the migration system currently has no way of knowing how the tool has been used in their case and if it is putting them at risk of wrongful enforcement action,” he said. “Without changes to ensure algorithmic transparency and accountability, the Home Office’s pledge to be ‘digital by default’ by 2025 will further encode injustices into the immigration system.”\n\nFizza Qureshi, the chief executive of the Migrants’ Rights Network, called for the tool to be withdrawn and raised concerns the AI could lead to racial bias.\n\n“There is a huge amount of data that is input into IPIC that will mean increased data-sharing with other government departments to gather health information, and suggests this tool will also be surveilling and monitoring migrants, further invading their privacy,” she said.\n\nIPIC has been in widespread operation since 2019-20. The Home Office refused previous freedom of information inquiries because greater openness “could be used to circumvent immigration controls by providing insight into how work in the Home Office and immigration enforcement is triaged”.\n\nMadeleine Sumption, the director of the Migration Observatory at the University of Oxford, said the use of AI in the immigration system was not inherently wrong, because in theory AI could improve human decision-making rather than replace it.\n\nShe said: “The government might well be able to make the case AI is leading to better decision-making and reducing unnecessary detention but without greater transparency we can’t know.”\n\nFor example if a country such as Iran is unlikely to accept deported nationals, pursuing such cases could be considered a waste of limited enforcement resources. Or if a person’s argument to remain is underpinned by human rights law meaning they are unlikely to be quickly deported, it may be better to prioritise other removals and in doing so avoid taking people into indefinite detention.\n\nHome Office documents say the tool is used to “assess the removability and level of harm posed by immigration offenders, automate the identification and prioritisation of cases, and to provide information on the length of time a barrier to removal has been in place”.\n\nA new draft data bill was introduced for debate in the UK parliament last month that “would effectively permit automated decision-making in most circumstances”, according to lawyers. This would be allowed as long as individuals affected can make representations, obtain meaningful human intervention and challenge automated decisions. can u summarize this article"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "The UK Home Office is using an AI-powered immigration enforcement system called IPIC to prioritize and manage its caseload. This system analyzes personal data of migrants, including biometrics, ethnicity, health, and criminal records, to recommend enforcement actions. Critics argue that this system is a \"robo-caseworker\" that could lead to biased decisions, including deportation, because it makes it easier for officials to rubber-stamp the algorithm's recommendations. They also point out that migrants are not informed about the AI's involvement in their cases and that the lack of transparency could lead to injustices. The Home Office claims the system is a rules-based tool that improves efficiency and that human caseworkers review every recommendation. However, campaigners demand greater transparency and accountability in the use of AI in the immigration system. \n"},
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  console.log(result.response.text());
}

run();
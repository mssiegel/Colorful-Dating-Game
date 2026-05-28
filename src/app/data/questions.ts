export interface Choice {
  id: string;
  label: string;
  correct: boolean;
}

export interface Question {
  scenario: string;
  prompt: "What does this represent?";
  choices: Choice[];
  conversationPrompt: string;
}

export type ModeId = "date-night" | "deep-dive" | "long-distance";

type QuestionInput = [scenario: string, choices: string[], correctAnswer: string, conversationPrompt: string];
export type ModeConfig = {
  id: ModeId;
  label: string;
  emoji: string;
  tagline: string;
  color: string;
  bg: string;
  surfaceBg: string;
  border: string;
  glow: string;
  softGlow: string;
  recommended?: boolean;
};

function makeQuestions(items: QuestionInput[]): Question[] {
  return items.map(([scenario, choices, correctAnswer, conversationPrompt]) => ({
    scenario,
    prompt: "What does this represent?",
    choices: choices.map((choice, index) => ({
      id: String.fromCharCode(97 + index),
      label: choice,
      correct: choice === correctAnswer,
    })),
    conversationPrompt,
  }));
}

export const QUESTIONS: Record<ModeId, Question[]> = {
  "date-night": makeQuestions([
    ["A friend suggests a restaurant you don’t love, but they seem excited about it.", ["Choosing connection over preference", "A serious food emergency", "Proof that menus are too long"], "Choosing connection over preference", "Tell about a time you went along with something small because it mattered to someone else."],
    ["A friend picks a movie that looks terrible, but they are clearly excited to watch it.", ["A tragic failure of cinema", "Being open-minded", "Popcorn-related bravery"], "Being open-minded", "Share a funny memory of something you expected to dislike but ended up enjoying."],
    ["A friend finally finishes a small task they have been avoiding, and you celebrate like they won an Olympic medal.", ["Encouragement", "Overuse of imaginary confetti", "Professional clapping skills"], "Encouragement", "Tell about a small win you had recently that deserved more celebration than it got."],
    ["There is one cookie left. You want it, but a friend looks at it like it is their long-lost soulmate.", ["Dessert diplomacy", "Generosity", "A cookie emergency hotline"], "Generosity", "Share a memory of a tiny sacrifice someone made that actually meant a lot."],
    ["A friend confidently leads you the wrong way, and instead of getting annoyed, you turn it into a mini adventure.", ["Flexibility", "Advanced wandering", "Map betrayal"], "Flexibility", "Tell about a time a plan went wrong but turned into a good story."],
    ["A friend laughs at a joke that barely made sense, but you laugh too because their laugh is funnier than the joke.", ["Enjoying the moment", "Advanced joke recycling", "Laugh-based confusion"], "Enjoying the moment", "Tell about a time someone’s laugh made something funnier than it actually was."],
    ["A friend wants to take one more picture even though you already took twelve.", ["Patience", "Historical documentation", "Camera survival training"], "Patience", "Share a funny memory of taking too many pictures."],
    ["A friend gets excited about a tiny dessert, and you treat it like a major life event.", ["Sharing joy", "Dessert diplomacy", "Cupcake emergency protocol"], "Sharing joy", "Tell about a small thing that makes you weirdly happy."],
    ["A friend starts telling a story you have heard before, but you still listen with a smile.", ["Kind attention", "Rerun appreciation", "Story déjà vu Olympics"], "Kind attention", "Share a story you know you probably tell more than once."],
    ["You are playing a game, and a friend is losing badly, so you cheer for them like they are making history.", ["Encouragement", "Competitive weather control", "Cheerleading without a license"], "Encouragement", "Tell about a time someone encouraged you when you were not doing great."],
    ["A friend tries a new outfit and asks what you think. You find something real and kind to compliment.", ["Thoughtful kindness", "Fashion diplomacy", "Emergency fabric analysis"], "Thoughtful kindness", "Share a compliment you once received that stayed with you."],
    ["A friend suggests a silly activity, and instead of acting too cool, you join in.", ["Playfulness", "Dignity evacuation", "Serious adult malfunction"], "Playfulness", "Tell about a time being silly made a moment better."],
    ["A friend mispronounces a word in a funny way, and you enjoy the moment without making them feel embarrassed.", ["Warmth", "Vocabulary fireworks", "Accidental language invention"], "Warmth", "Share a funny word mistake you or someone else made."],
    ["A friend spends five minutes choosing between two snacks, and you manage not to rush them.", ["Patience", "Snack courtroom drama", "Potato chip leadership"], "Patience", "Tell about a tiny decision that somehow felt very important."],
    ["A friend starts dancing for no reason, and you decide the room could use more dancing.", ["Joining the joy", "Unauthorized choreography", "Floor-based enthusiasm"], "Joining the joy", "Share a memory of a spontaneous fun moment."],
    ["A friend tells you about something they love, and you ask a follow-up question even though it is not your thing.", ["Curiosity", "Hobby investigation services", "Polite confusion management"], "Curiosity", "Tell about something you love that you wish more people asked you about."],
    ["The plan changes at the last minute, and you decide to make the new plan fun too.", ["Flexibility", "Calendar gymnastics", "Schedule betrayal recovery"], "Flexibility", "Share a time a changed plan worked out better than expected."],
    ["A friend is proud of finding a great parking spot, and you celebrate like they discovered treasure.", ["Celebrating small wins", "Parking archaeology", "Asphalt appreciation"], "Celebrating small wins", "Tell about a tiny victory that made your day better."],
    ["A friend sends a meme that is only mildly funny, but you appreciate that they thought of you.", ["Appreciation", "Meme diplomacy", "Internet pigeon delivery"], "Appreciation", "Share a small message or joke that made you feel remembered."],
    ["A friend wants to tell you a long story about something tiny, and you let them enjoy the full dramatic version.", ["Making space", "Tiny event documentary", "Advanced nodding endurance"], "Making space", "Tell about a small event from your life that deserves a dramatic retelling."],
    ["A friend accidentally spills a drink, and you help clean it up without turning it into a big deal.", ["Grace", "Beverage disaster response", "Tabletop ocean management"], "Grace", "Share a time someone made an awkward moment feel okay."],
    ["A friend recommends a song, and you actually listen instead of just saying “nice.”", ["Genuine interest", "Ear-based research", "Playlist diplomacy"], "Genuine interest", "Share a song that reminds you of a specific memory."],
    ["A friend gets very passionate about which ice cream flavor is best, and you enjoy their passion.", ["Appreciating personality", "Frozen dessert debate club", "Spoon-powered justice"], "Appreciating personality", "Tell about a harmless opinion you feel surprisingly strongly about."],
    ["A friend forgets what they were saying, so you gently help them find their way back.", ["Support", "Thought rescue mission", "Brain tab reopening"], "Support", "Share a time someone helped you feel less embarrassed."],
    ["A friend is excited to show you something small on their phone, and you give it your real attention.", ["Presence", "Tiny screen ceremony", "Thumb-scroll discipline"], "Presence", "Tell about a small thing you like showing people."],
    ["You both get the lyrics wrong to a song, but keep singing anyway.", ["Shared fun", "Musical confidence without evidence", "Karaoke lawlessness"], "Shared fun", "Share a funny memory involving music or singing."],
    ["A friend tells a pun, and even though it is terrible, you give it the respect it deserves.", ["Good humor", "Pun-based survival", "Wordplay emergency care"], "Good humor", "Tell your best terrible joke or pun."],
    ["A friend is nervous to try something new, so you make it feel low-pressure and fun.", ["Reassurance", "Fear reduction engineering", "Emotional bubble wrap"], "Reassurance", "Share a time trying something new felt easier because of someone else."],
    ["A friend wants to stop for coffee even though you are not in the mood, but you enjoy the extra time together.", ["Valuing time together", "Caffeine diplomacy", "Cup-based detour science"], "Valuing time together", "Tell about a small detour that became the best part of the day."],
    ["A friend makes a tiny mistake in a game, and you choose laughter over criticism.", ["Lightheartedness", "Board game mercy", "Strategic giggling"], "Lightheartedness", "Share a memory of a game that got funnier because things went wrong."],
    ["A friend is excited about a bargain they found, and you admire their victory.", ["Sharing excitement", "Discount heroism", "Receipt celebration ceremony"], "Sharing excitement", "Tell about a great deal or small find you were proud of."],
    ["A friend starts a sentence with “This might sound weird,” and you make them feel safe to continue.", ["Openness", "Weirdness welcome desk", "Conversation safety goggles"], "Openness", "Share something small or quirky that you enjoy."],
    ["A friend takes a little longer to get ready, so you use the time calmly instead of getting annoyed.", ["Patience", "Waiting room wisdom", "Shoe-selection endurance"], "Patience", "Tell about something you take your time with."],
    ["A friend tells you good news, and you ask questions instead of quickly changing the topic.", ["Celebrating others", "Joy investigation", "Confetti management"], "Celebrating others", "Share a piece of good news, big or small, that still makes you smile."],
    ["A friend admits they picked the wrong route, and you make it funny instead of making them feel bad.", ["Kindness", "Map forgiveness", "GPS rebellion"], "Kindness", "Tell about a time getting lost became part of the adventure."],
    ["A friend suggests ordering something unusual, and you decide to be brave and taste it.", ["Adventurousness", "Fork-based courage", "Menu roulette"], "Adventurousness", "Share a food you tried that surprised you."],
    ["A friend remembers something small you like, and you let them know it meant something.", ["Gratitude", "Memory applause", "Tiny preference celebration"], "Gratitude", "Tell about a small detail someone remembered about you."],
    ["A friend is telling a story slowly, and you let the story arrive at its own speed.", ["Respectful listening", "Story traffic control", "Patience with plot development"], "Respectful listening", "Share a story you enjoy telling slowly."],
    ["A friend does something thoughtful, so you point it out instead of letting it pass unnoticed.", ["Appreciation", "Kindness detection", "Compliment radar"], "Appreciation", "Tell about a thoughtful thing someone did for you."],
    ["A friend gets excited about a board game rule, and you admire their intense commitment.", ["Enjoying their enthusiasm", "Rulebook romance", "Dice-powered seriousness"], "Enjoying their enthusiasm", "Share something harmless that you take very seriously."],
    ["A friend has a rough day, so you suggest doing something simple and comforting.", ["Care", "Blanket strategy", "Emotional snack planning"], "Care", "Tell about a simple thing that helps you feel better after a hard day."],
    ["A friend starts telling you about a dream they had, and you listen even though dreams can get confusing fast.", ["Interest", "Sleep cinema analysis", "Pillow-based storytelling"], "Interest", "Share a strange or funny dream you remember."],
    ["A friend says, “You choose,” and you pick something you think they would also enjoy.", ["Thoughtfulness", "Decision wizardry", "Menu mind-reading"], "Thoughtfulness", "Tell about a time someone chose something with you in mind."],
    ["A friend makes a joke at the perfect time and lightens the whole mood.", ["Bringing joy", "Timing sorcery", "Emergency comedy deployment"], "Bringing joy", "Share a time humor helped a moment feel better."],
    ["A friend wants to try a cheesy touristy activity, and you decide cheesy can be fun.", ["Being open to fun", "Souvenir psychology", "Tourist hat acceptance"], "Being open to fun", "Tell about a cheesy activity you secretly enjoyed."],
    ["A friend is proud of making something simple, and you notice the effort behind it.", ["Encouragement", "Craft appreciation committee", "Glue stick diplomacy"], "Encouragement", "Share something simple you made or did that made you proud."],
    ["A friend repeats a phrase they always say, and instead of teasing too much, you enjoy that it is “their thing.”", ["Affection", "Catchphrase documentation", "Personality subtitles"], "Affection", "Tell about a phrase or habit people associate with you."],
    ["A friend makes a small suggestion that improves the plan, and you happily give them credit.", ["Appreciation", "Idea trophy distribution", "Plan seasoning"], "Appreciation", "Share a time someone’s small idea made something better."],
    ["A friend wants to sit somewhere different than you expected, and you decide the company matters more than the seat.", ["Prioritizing connection", "Chair negotiation", "Furniture-based flexibility"], "Prioritizing connection", "Tell about a time the people mattered more than the place."],
    ["A friend says, “This is going to sound dramatic,” and you happily prepare for the full dramatic version.", ["Making room for personality", "Drama seatbelt safety", "Emotional popcorn preparation"], "Making room for personality", "Share a time you made something small sound dramatic for fun."],
  ]),

  "deep-dive": makeQuestions([
    ["You promised to help with something, but now you’re tired and hoping the other person forgets.", ["Responsibility", "Strategic invisibility", "Creative scheduling"], "Responsibility", "Tell about a time keeping your word was harder than you expected."],
    ["A friend asks what happened, and a small lie would make you look better.", ["Story editing", "Honesty", "Emergency reputation repair"], "Honesty", "Share a time when telling the truth felt uncomfortable but important."],
    ["You helped make something succeed, but no one notices. You can either point it out or let the moment pass.", ["Humility", "Invisible trophy collecting", "Waiting for dramatic applause"], "Humility", "Tell about a time you did something good that most people never saw."],
    ["A friend did something that bothered you. You want to avoid it, but you know the honest conversation may help.", ["Courage", "Emotional parkour", "Professional topic dodging"], "Courage", "Share a memory of a conversation you were nervous to have but were glad you had."],
    ["You find a way to take a shortcut that no one would notice, but it would not feel right.", ["Secret efficiency", "Integrity", "Becoming a loophole detective"], "Integrity", "Tell about a time you made the right choice even though no one would have known."],
    ["You realize you interrupted someone, and you choose to pause and let them finish.", ["Respect", "Conversation traffic control", "Verbal emergency braking"], "Respect", "Tell about a time you felt respected because someone really let you speak."],
    ["A friend receives praise for something you helped with, and you choose to be happy for them.", ["Generosity of spirit", "Invisible trophy polishing", "Applause budgeting"], "Generosity of spirit", "Share a time you had to choose between wanting credit and being happy for someone else."],
    ["You are tempted to check out of a difficult conversation, but you stay present.", ["Emotional courage", "Chair-based survival", "Strategic staring"], "Emotional courage", "Tell about a conversation that was hard but worth staying in."],
    ["A friend makes a mistake, and you remember that you have needed patience too.", ["Compassion", "Mistake museum membership", "Grace recycling"], "Compassion", "Share a time someone was patient with you when you needed it."],
    ["You feel like snapping back, but you take a breath before answering.", ["Self-control", "Mouth traffic lights", "Anger buffering"], "Self-control", "Tell about a time pausing before speaking changed the outcome."],
    ["You realize you were wrong, and instead of defending yourself, you admit it.", ["Humility", "Ego gymnastics", "Reputation first aid"], "Humility", "Share a time admitting you were wrong helped something heal or improve."],
    ["A friend trusted you with something private, and you choose not to turn it into a story for others.", ["Loyalty", "Secret storage technology", "Gossip resistance training"], "Loyalty", "Talk about what makes someone feel trustworthy to you."],
    ["You notice someone is being left out, so you make space for them to join.", ["Inclusion", "Social chair arranging", "Group chat architecture"], "Inclusion", "Tell about a time someone made you feel included."],
    ["You could win an argument by being harsh, but you choose to speak with care.", ["Gentleness", "Verbal sword safety", "Debate pillow mode"], "Gentleness", "Share a time a gentle answer worked better than a sharp one."],
    ["You do not feel appreciated, but you still choose to do the right thing.", ["Integrity", "Invisible hero training", "Applause fasting"], "Integrity", "Tell about a time you kept doing the right thing without much recognition."],
    ["A friend succeeds at something you wanted too, and you choose not to let jealousy run the moment.", ["Contentment", "Jealousy parking", "Trophy weather control"], "Contentment", "Share a time you had to practice being happy with your own path."],
    ["You receive feedback that stings, but you look for the part that might help you grow.", ["Teachability", "Ego dental work", "Feedback survival mode"], "Teachability", "Tell about feedback that was hard to hear but helped you."],
    ["A friend is struggling, and instead of giving a quick lecture, you first try to understand.", ["Empathy", "Advice delay system", "Wisdom traffic jam"], "Empathy", "Share a time someone understood you before trying to fix the problem."],
    ["You are tired, but you still show up because someone is counting on you.", ["Reliability", "Zombie calendar obedience", "Commitment with sleepy eyes"], "Reliability", "Tell about someone in your life who is reliable."],
    ["A friend apologizes awkwardly, and you choose to receive the apology instead of making it harder.", ["Forgiveness", "Apology obstacle course", "Grudge gardening"], "Forgiveness", "Share what makes an apology feel sincere to you."],
    ["You are about to make a decision quickly, but you pause to ask whether it is wise.", ["Discernment", "Decision speed bump", "Brain committee meeting"], "Discernment", "Tell about a time pausing helped you make a better decision."],
    ["You notice someone doing quiet work that others ignore, and you thank them.", ["Gratitude", "Appreciation radar", "Invisible labor spotlight"], "Gratitude", "Share a person whose quiet effort you appreciate."],
    ["A friend tells you something vulnerable, and you treat it carefully.", ["Trustworthiness", "Emotional glass handling", "Secret bubble wrap"], "Trustworthiness", "Talk about what helps you feel safe sharing honestly."],
    ["You disagree with someone, but you still try to understand why they see it differently.", ["Open-mindedness", "Opinion tourism", "Debate yoga"], "Open-mindedness", "Share a time someone helped you see an issue differently."],
    ["You make a mistake and choose to repair it instead of hoping it disappears.", ["Accountability", "Mistake hide-and-seek", "Consequence dodging"], "Accountability", "Tell about a time taking responsibility made things better."],
    ["You have a chance to embarrass someone with a joke, but you choose not to.", ["Kindness", "Comedy brakes", "Joke quarantine"], "Kindness", "Share a time someone protected your dignity."],
    ["Someone has less experience than you, and you explain without making them feel small.", ["Humility", "Knowledge without fireworks", "Expert hat control"], "Humility", "Tell about someone who taught you in a way that made you feel respected."],
    ["A situation is unfair, and you speak up even though staying quiet would be easier.", ["Justice", "Fairness megaphone", "Moral weather alert"], "Justice", "Share a time you saw someone stand up for what was right."],
    ["You want something now, but you choose to wait because the timing is not right.", ["Patience", "Desire parking", "Snack-level self-control"], "Patience", "Tell about something good that required waiting."],
    ["A friend disappoints you, and you decide to talk honestly instead of silently building a case against them.", ["Direct communication", "Internal courtroom drama", "Secret evidence collecting"], "Direct communication", "Talk about what helps you bring up something difficult kindly."],
    ["You have more than you need, and you notice someone who could use help.", ["Generosity", "Possession redistribution science", "Stuff management with feelings"], "Generosity", "Share a time giving something away made you happier than keeping it."],
    ["You are under pressure, but you refuse to cut a corner that would hurt someone else.", ["Integrity", "Shortcut allergy", "Deadline wrestling"], "Integrity", "Tell about a time pressure tested your values."],
    ["A friend is excited about something you do not fully understand, but you honor that it matters to them.", ["Respect", "Enthusiasm translation", "Hobby diplomacy"], "Respect", "Share something that matters to you even if other people do not fully get it."],
    ["You know you need help, and instead of pretending, you ask for it.", ["Honesty", "Independence malfunction", "Pride maintenance break"], "Honesty", "Tell about a time asking for help was the strong choice."],
    ["Someone gives you a second chance, and you take it seriously.", ["Responsibility", "Redemption paperwork", "Chance management"], "Responsibility", "Share a time you were grateful for another chance."],
    ["A friend is moving slowly through a hard season, and you do not pressure them to “just be fine.”", ["Compassion", "Emotional speed limit respect", "Feelings traffic control"], "Compassion", "Talk about what kind of support helps when you are not okay yet."],
    ["You could bring up an old mistake to win a new argument, but you choose not to use it as a weapon.", ["Mercy", "Archive restraint", "Ancient evidence storage"], "Mercy", "Share what helps you move forward after a past hurt."],
    ["You notice you are becoming defensive, so you ask a question instead.", ["Wisdom", "Ego seatbelt use", "Argument detour planning"], "Wisdom", "Tell about a time asking a question helped more than defending yourself."],
    ["A friend needs support, but not advice, so you simply sit with them.", ["Presence", "Advice power saving mode", "Quiet couch leadership"], "Presence", "Share a time someone’s presence helped more than their words."],
    ["You are tempted to exaggerate a story, but you keep it accurate.", ["Honesty", "Drama reduction", "Story calorie control"], "Honesty", "Tell about a time the plain truth was better than the impressive version."],
    ["You see a habit in yourself that is hurting connection, and you decide to work on it.", ["Growth", "Personality renovation", "Inner software update"], "Growth", "Share one area where you have grown or want to grow."],
    ["Someone is having a better day than you, and you choose not to pull them down.", ["Maturity", "Mood weather control", "Joy protection services"], "Maturity", "Tell about a time you protected someone else’s joy."],
    ["You have a strong opinion, but you admit there may be more to learn.", ["Humility", "Opinion stretching", "Certainty diet"], "Humility", "Share a belief or opinion that became more nuanced over time."],
    ["A friend is nervous, and you remind them of their strengths without exaggerating.", ["Encouragement", "Confidence sprinkling", "Compliment engineering"], "Encouragement", "Tell about encouragement that helped you feel braver."],
    ["You made a promise when you felt inspired, and now you keep it when the inspiration is gone.", ["Commitment", "Motivation leftovers", "Promise maintenance"], "Commitment", "Share a commitment that matters to you even when it is not easy."],
    ["You are frustrated, but you choose not to punish the other person with silence.", ["Healthy communication", "Silent treatment cancellation", "Emotional freeze warning"], "Healthy communication", "Talk about what helps you communicate when you are upset."],
    ["A friend shares a success, and you resist comparing it to your own life.", ["Security", "Comparison detox", "Trophy mathematics refusal"], "Security", "Share something that helps you avoid comparing yourself to others."],
    ["You choose to say thank you for something ordinary because ordinary care still matters.", ["Gratitude", "Appreciation of normal objects", "Thank-you muscle training"], "Gratitude", "Tell about an ordinary thing someone does that you appreciate."],
    ["You realize the goal is not to win the disagreement, but to protect the relationship.", ["Prioritizing connection", "Argument scorekeeping retirement", "Debate trophy refusal"], "Prioritizing connection", "Share a time connection mattered more than being right."],
    ["You are given responsibility, and you quietly prepare instead of hoping it works out somehow.", ["Diligence", "Hope-based planning", "Calendar bravery"], "Diligence", "Tell about something you prepared for that mattered to you."],
  ]),

  "long-distance": makeQuestions([
    ["You only have ten minutes to talk, but instead of being distracted, you give a friend your full attention.", ["Presence", "Efficient multitasking", "Advanced phone-holding skills"], "Presence", "Tell about a small moment when you felt truly listened to."],
    ["Nothing major happened today, but you still share one tiny detail that would usually be easy to skip.", ["Sharing life", "Breaking news about sandwiches", "International snack reporting"], "Sharing life", "Share one small detail from your day that the other person might not know unless you told them."],
    ["A friend mentioned something important recently. Later, you remember to ask how it went.", ["Careful attention", "Calendar wizardry", "Memory showing off"], "Careful attention", "Tell about a time someone remembered a small detail about you and it made you feel cared for."],
    ["A friend seems quieter than usual. Instead of assuming the worst, you stay kind and give them room to explain.", ["Trust", "Detective mode", "Emotional weather forecasting"], "Trust", "Talk about what helps you feel safe opening up when something is on your mind."],
    ["Life feels busy, so you suggest one simple thing to enjoy together soon.", ["Hope", "Scheduling with feelings", "Imaginary calendar decoration"], "Hope", "Share one small thing you would love to do together soon."],
    ["A friend tells you something ordinary from their day, and you treat it like it matters because it matters to them.", ["Attentiveness", "Daily life archaeology", "Sandwich-level journalism"], "Attentiveness", "Share one ordinary detail from today that you would like the other person to know."],
    ["A friend seems tired, so you ask a gentle question instead of demanding a big conversation.", ["Sensitivity", "Energy-level detective work", "Conversation volume control"], "Sensitivity", "Talk about what kind of question helps you open up when you are tired."],
    ["You remember something a friend was worried about and ask how they are feeling now.", ["Care", "Worry follow-up services", "Emotional bookmark usage"], "Care", "Tell about a time someone followed up and it made you feel cared for."],
    ["A friend shares good news, and you slow down enough to really celebrate it.", ["Shared joy", "Confetti scheduling", "Celebration logistics"], "Shared joy", "Share something good, even if it is small, that you want to celebrate."],
    ["You notice a friend has been carrying a lot, so you ask what would feel supportive right now.", ["Thoughtful support", "Emotional tech support", "Feelings customer service"], "Thoughtful support", "Talk about one kind of support that feels meaningful to you."],
    ["A friend is quiet, and instead of filling the silence too quickly, you stay calm and present.", ["Patience", "Silence management", "Quietness supervision"], "Patience", "Tell about when silence feels comfortable versus uncomfortable for you."],
    ["A friend shares something vulnerable, and you thank them for trusting you.", ["Emotional safety", "Secret-handling certification", "Vulnerability applause"], "Emotional safety", "Share what helps you feel safe being honest."],
    ["You are busy, but you take a small moment to show someone they are on your mind.", ["Consistency", "Thought delivery service", "Calendar loophole affection"], "Consistency", "Tell about a small gesture that makes you feel remembered."],
    ["A friend tells you about something stressful, and you ask whether they want advice or just listening.", ["Respectful support", "Advice traffic control", "Wisdom permission slip"], "Respectful support", "When you are stressed, do you usually want advice, comfort, distraction, or questions?"],
    ["You notice a friend’s effort, even though the result is not perfect.", ["Appreciation", "Effort radar", "Almost-perfect celebration science"], "Appreciation", "Share something you have been trying at, even if it is still a work in progress."],
    ["A friend says, “I don’t know how to explain it,” and you give them time to find the words.", ["Patience", "Sentence waiting room", "Word rescue operations"], "Patience", "Tell about something that is hard for you to explain but matters."],
    ["You ask a friend what made them smile today, even if it was tiny.", ["Looking for joy", "Smile investigation", "Happiness detective badge"], "Looking for joy", "Share one tiny thing that made you smile recently."],
    ["A friend sounds discouraged, so you remind them of a strength you genuinely see in them.", ["Encouragement", "Compliment flashlight", "Confidence delivery"], "Encouragement", "Tell about a strength you appreciate in the other person."],
    ["You realize you have been distracted, so you put the distraction away and restart the conversation with attention.", ["Presence", "Phone exile", "Attention reboot"], "Presence", "Share what helps you feel like someone is really with you in a conversation."],
    ["A friend remembers something you said casually, and it makes the moment feel personal.", ["Being known", "Memory sparkle", "Detail collection hobby"], "Being known", "Share a small thing you like when people remember about you."],
    ["You make a simple plan to enjoy something together soon, even if life is busy.", ["Intentional connection", "Calendar with feelings", "Future snack architecture"], "Intentional connection", "Name one simple thing you would enjoy doing together soon."],
    ["A friend admits they are overwhelmed, and you respond with kindness instead of trying to fix everything.", ["Compassion", "Problem-solving pause button", "Fix-it toolbox restraint"], "Compassion", "Talk about what helps when you feel overwhelmed."],
    ["You ask a friend what they need more of lately: rest, fun, help, or reassurance.", ["Emotional curiosity", "Needs inventory", "Feelings menu ordering"], "Emotional curiosity", "Answer the question: what do you need more of lately?"],
    ["A friend is excited about something small, and you do not minimize it.", ["Honoring joy", "Tiny excitement protection", "Mini celebration security"], "Honoring joy", "Share something small you are excited about."],
    ["A friend tells you they miss something, and you listen without rushing them out of the feeling.", ["Tenderness", "Feelings waiting room", "Nostalgia supervision"], "Tenderness", "Share something you miss or feel nostalgic about."],
    ["You check in after a difficult moment instead of pretending it never happened.", ["Repair", "Awkwardness maintenance", "Emotional cleanup crew"], "Repair", "Talk about what makes repair after tension feel easier."],
    ["A friend says they need a quiet night, and you accept it without taking it personally.", ["Trust", "Quiet-night diplomacy", "Personalization prevention"], "Trust", "Share what helps you feel trusted when you need space."],
    ["You ask a friend what they are looking forward to, not just what they got done.", ["Hopefulness", "Future joy scouting", "Calendar treasure hunting"], "Hopefulness", "Tell about one thing you are looking forward to."],
    ["A friend tells you about a hard part of their day, and you do not compete with your own harder story.", ["Empathy", "Struggle Olympics cancellation", "Hard-day scoreboard removal"], "Empathy", "Share what kind of response helps you feel understood."],
    ["You notice a friend did something thoughtful and you say so out loud.", ["Appreciation", "Kindness announcement", "Thoughtfulness spotlighting"], "Appreciation", "Tell the other person one thoughtful thing you have noticed about them."],
    ["A friend has a lot to say, and you let them finish before sharing your own thought.", ["Deep listening", "Sentence patience", "Conversation lane discipline"], "Deep listening", "Talk about what helps you feel listened to."],
    ["You ask, “How did that feel?” instead of only asking, “What happened?”", ["Emotional awareness", "Feelings journalism", "Plot with subtitles"], "Emotional awareness", "Share a recent moment and how it felt, not just what happened."],
    ["A friend shares a goal, and you ask what would help them feel supported.", ["Partnership", "Goal support engineering", "Dream scaffolding"], "Partnership", "Share one goal and one way the other person could support you."],
    ["You notice a friend seems proud of something, so you ask them to tell you more.", ["Encouragement", "Pride permission slip", "Achievement microphone"], "Encouragement", "Tell about something you are proud of but do not always mention."],
    ["A friend is not ready to talk about something yet, and you respect the pace.", ["Respect", "Emotional speed limit", "Topic parking"], "Respect", "Talk about what helps you open up at your own pace."],
    ["You say something kind without waiting for a special occasion.", ["Affection", "Compliment ambush", "Kindness scheduling error"], "Affection", "Say one kind thing you appreciate about the other person right now."],
    ["A friend shares a fear, and you do not laugh it off or dismiss it.", ["Validation", "Fear respect protocol", "Worry umbrella service"], "Validation", "Share a fear or worry that feels easier when someone takes it seriously."],
    ["You ask about a friend’s inner world, not just their schedule.", ["Emotional intimacy", "Soul calendar checking", "Inner weather report"], "Emotional intimacy", "Share something that has been on your mind lately."],
    ["A friend is happy about something you would not have chosen, and you still celebrate their happiness.", ["Love without control", "Preference peace treaty", "Joy non-interference"], "Love without control", "Tell about something that makes you happy even if not everyone gets it."],
    ["You ask, “What was the best part of your day?” and really wait for the answer.", ["Connection", "Daily highlight mining", "Joy excavation"], "Connection", "Answer the question: what was the best part of your day?"],
    ["A friend is disappointed, and you stay warm instead of trying to force them to cheer up.", ["Acceptance", "Mood control refusal", "Sadness seat-saving"], "Acceptance", "Talk about what helps when you are disappointed."],
    ["You notice a repeated effort someone is making, even if progress is slow.", ["Seeing growth", "Progress microscope", "Effort tracking software"], "Seeing growth", "Share one way you have grown slowly over time."],
    ["A friend shares a memory, and you ask what made it meaningful to them.", ["Curiosity", "Memory archaeology", "Nostalgia interviewing"], "Curiosity", "Tell about a memory and why it matters to you."],
    ["You make room for both people to talk, instead of letting one person carry the whole conversation.", ["Balance", "Conversation weightlifting", "Talking-time budgeting"], "Balance", "Talk about whether you usually find it easier to speak, listen, or ask questions."],
    ["A friend says, “This may sound small,” and you answer, “Small things count.”", ["Valuing details", "Tiny moment protection", "Small-talk upgrade"], "Valuing details", "Share a small thing that actually matters to you."],
    ["You sense that a friend needs reassurance, so you offer it clearly instead of making them guess.", ["Reassurance", "Emotional Wi-Fi boost", "Comfort delivery"], "Reassurance", "What kind of reassurance feels most meaningful to you?"],
    ["A friend tells you about a mistake, and you respond in a way that makes it safe to be human.", ["Grace", "Mistake-friendly atmosphere", "Human error hospitality"], "Grace", "Tell about a time someone’s response made your mistake feel less scary."],
    ["You ask what has been making a friend feel most like themselves lately.", ["Knowing someone deeply", "Identity detective work", "Personality treasure map"], "Knowing someone deeply", "Share something that has made you feel like yourself recently."],
    ["A friend is sharing something meaningful, and you resist turning it into a joke too quickly.", ["Reverence", "Comedy brakes", "Seriousness respect mode"], "Reverence", "Talk about when humor helps you and when you prefer seriousness."],
    ["You end a conversation by naming one thing you appreciated, so the moment feels complete.", ["Gratitude", "Conversation gift wrapping", "Appreciation exit sign"], "Gratitude", "Name one thing you appreciated about this conversation."],
  ]),
};

export function sampleQuestions(questionBank: Question[], count = 5): Question[] {
  const shuffled = [...questionBank];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled.slice(0, count);
}

export const MODE_CONFIG: Record<ModeId, Omit<ModeConfig, "id">> = {
  "date-night": {
    label: "Date Night",
    emoji: "🕯️",
    tagline: "Light & playful",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.15)",
    surfaceBg: "#fffbeb",
    border: "#fde68a",
    glow: "rgba(245,158,11,0.3)",
    softGlow: "rgba(245,158,11,0.2)",
  },
  "deep-dive": {
    label: "Deep Dive",
    emoji: "🧠",
    tagline: "Core values",
    color: "#ff4d7e",
    bg: "rgba(255,77,126,0.15)",
    surfaceBg: "#fff1f7",
    border: "#ff4d7e",
    glow: "rgba(255,77,126,0.3)",
    softGlow: "rgba(255,77,126,0.2)",
    recommended: true,
  },
  "long-distance": {
    label: "Long Distance",
    emoji: "💌",
    tagline: "Heartfelt",
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.15)",
    surfaceBg: "#f5f0ff",
    border: "#c4b5fd",
    glow: "rgba(124,58,237,0.3)",
    softGlow: "rgba(124,58,237,0.18)",
  },
};

export const MODES: ModeConfig[] = [
  { id: "date-night", ...MODE_CONFIG["date-night"] },
  { id: "deep-dive", ...MODE_CONFIG["deep-dive"] },
  { id: "long-distance", ...MODE_CONFIG["long-distance"] },
];

export const DEFAULT_MODE_ID: ModeId = "deep-dive";

export const MODE_IDS = MODES.map((mode) => mode.id);

export function isModeId(mode: string | undefined): mode is ModeId {
  return Boolean(mode && MODE_IDS.includes(mode as ModeId));
}

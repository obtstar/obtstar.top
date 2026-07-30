// 报告: prompt-engineering-v7 - 第1块
// 页数: 16-30

window.REPORT_CHUNK_prompt_engineering_v7_1 = {
  reportId: "prompt-engineering-v7",
  chunkIndex: 1,
  pageRange: "16-30",
  sections: [
    {
      title: 'limitation of your model.',
      level: 1,
      content: `<p>Prompt Engineering Prompt Engineering</p>
<p>The number of examples you need for few-shot prompting depends on a few factors, 少样本提示所需的示例数量取决于几个因素，包括任务的复杂性、示例的质量以及您使用的生</p>
<p>including the complexity of the task, the quality of the examples, and the capabilities of the 成式人工智能（生成式AI）模型的能力。一般经验法则是，少样本提示应至少使用三到五个</p>
<p>generative AI (gen AI) model you are using. As a general rule of thumb, you should use at 示例。然而，对于更复杂的任务，您可能需要使用更多示例，或者由于模型输入长度的限制，</p>
<p>least three to five examples for few-shot prompting. However, you may need to use more 可能需要使用更少的示例。</p>
<p>examples for more complex tasks, or you may need to use fewer due to the input length</p>
<p>limitation of your model.</p>
<p>Table 2 shows a few-shot prompt example, let’s use the same gemini-pro model 表2展示了一个少样本提示示例，我们使用与之前相同的gemini‑pro模型配置设置，唯一不</p>
<p>configuration settings as before, other than increasing the token limit to accommodate the 同的是增加了令牌限制以适应更长响应的需求。</p>
<p>need for a longer response.</p>
<p>Goal Parse pizza orders to JSON Goal 将披萨订单解析为 JSON</p>
<p>Model gemini-pro 模型 gemini-pro</p>
<p>Temperature 0.1 Token Limit 250 温度 0.1 令牌限制 250</p>
<p>Top-K N/A Top-P 1 Top-K N/A Top-P 1</p>
<p>Prompt Parse a customer&#x27;s pizza order into valid JSON: 提示词 Parse a customer&#x27;s pizza order into valid JSON:</p>
<p>EXAMPLE: EXAMPLE:</p>
<p>I want a small pizza with cheese, tomato sauce, and pepperoni. I want a small pizza with cheese, tomato sauce, and pepperoni.</p>
<p>JSON Response: JSON Response:</p>
<p>\`\`\` \`\`\`</p>
<p>{ {</p>
<p>&quot;size&quot;: &quot;small&quot;, &quot;size&quot;: &quot;small&quot;,</p>
<p>&quot;type&quot;: &quot;normal&quot;, &quot;type&quot;: &quot;normal&quot;,</p>
<p>&quot;ingredients&quot;: [[&quot;cheese&quot;, &quot;tomato sauce&quot;, &quot;peperoni&quot;]] &quot;ingredients&quot;: [[&quot;cheese&quot;, &quot;tomato sauce&quot;, &quot;peperoni&quot;]]</p>
<p>} }</p>
<p>\`\`\` \`\`\`</p>
<p>Continues next page... 续下页...</p>
<p>February 2025 16 2025年2月 16</p>
<p>Prompt Engineering Prompt Engineering</p>
<p>Prompt EXAMPLE: 提示 EXAMPLE:</p>
<p>Can I get a large pizza with tomato sauce, basil and mozzarella Can I get a large pizza with tomato sauce, basil and mozzarella</p>
<p>{ {</p>
<p>&quot;size&quot;: &quot;large&quot;, &quot;size&quot;: &quot;large&quot;,</p>
<p>&quot;type&quot;: &quot;normal&quot;, &quot;type&quot;: &quot;normal&quot;,</p>
<p>&quot;ingredients&quot;: [[&quot;tomato sauce&quot;, &quot;bazel&quot;, &quot;mozzarella&quot;]] &quot;ingredients&quot;: [[&quot;tomato sauce&quot;, &quot;bazel&quot;, &quot;mozzarella&quot;]]</p>
<p>} }</p>
<p>Now, I would like a large pizza, with the first half cheese and Now, I would like a large pizza, with the first half cheese and</p>
<p>mozzarella. And the other tomato sauce, ham and pineapple. mozzarella. And the other tomato sauce, ham and pineapple.</p>
<p>JSON Response: JSON Response:</p>
<p>Output \`\`\` 输出 \`\`\`</p>
<p>{ {</p>
<p>&quot;size&quot;: &quot;large&quot;, &quot;size&quot;: &quot;large&quot;,</p>
<p>&quot;type&quot;: &quot;half-half&quot;, &quot;type&quot;: &quot;half-half&quot;,</p>
<p>&quot;ingredients&quot;: [[&quot;cheese&quot;, &quot;mozzarella&quot;], [&quot;tomato sauce&quot;, &quot;ingredients&quot;: [[&quot;cheese&quot;, &quot;mozzarella&quot;], [&quot;tomato sauce&quot;,</p>
<p>&quot;ham&quot;, &quot;pineapple&quot;]] &quot;ham&quot;, &quot;pineapple&quot;]]</p>
<p>} }</p>
<p>\`\`\` \`\`\`</p>
<p>Table 2. An example of few-shot prompting Table 2. An example of few-shot prompting</p>
<p>When you choose examples for your prompt, use examples that are relevant to the task you 当你为提示选择示例时，使用与您想执行的任务相关的示例。示例应多样化、高质量且书写良好。</p>
<p>want to perform. The examples should be diverse, of high quality, and well written. One small 一个小错误可能会使模型混淆，导致不理想的输出。</p>
<p>mistake can confuse the model and will result in undesired output.</p>
<p>If you are trying to generate output that is robust to a variety of inputs, then it is important to 如果您试图生成对各种输入都具有鲁棒性的输出，那么在示例中包含边缘案例非常重要。边缘案</p>
<p>include edge cases in your examples. Edge cases are inputs that are unusual or unexpected, 例是指不寻常或意外的输入，但模型仍应能够处理这些输入。</p>
<p>but that the model should still be able to handle.</p>
<p>February 2025 17 2025年2月 17</p>
<p>Prompt Engineering Prompt Engineering</p>
<p>System, contextual and role prompting 系统、上下文和角色提示</p>
<p>System, contextual and role prompting are all techniques used to guide how LLMs generate 系统、上下文和角色提示都是用于指导大型语言模型生成文本的技术，但它们侧重于不同的方</p>
<p>text, but they focus on different aspects: 面：</p>
<ul>
<li>System prompting sets the overall context and purpose for the language model. It • 系统提示设定了语言模型的整体背景和目的。它定义了模型应执行的“宏观”任务，比</li>
</ul>
<p>defines the ‘big picture’ of what the model should be doing, like translating a language, 如翻译语言、分类评论等。</p>
<p>classifying a review etc.</p>
<ul>
<li>Contextual prompting provides specific details or background information relevant to • 上下文提示提供与当前对话或任务相关的具体细节或背景信息。它帮助模型理解所提问题</li>
</ul>
<p>the current conversation or task. It helps the model to understand the nuances of what’s 的细微差别，并相应地调整回答。</p>
<p>being asked and tailor the response accordingly.</p>
<ul>
<li>Role prompting assigns a specific character or identity for the language model to adopt. • 角色提示为语言模型分配一个特定的角色或身份。这有助于模型生成与所分配角色及其相关</li>
</ul>
<p>This helps the model generate responses that are consistent with the assigned role and its 知识和行为一致的回答。</p>
<p>associated knowledge and behavior.</p>
<p>There can be considerable overlap between system, contextual, and role prompting. E.g. a 系统提示、上下文提示和角色提示之间可能存在相当大的重叠。例如，分配角色给系统的提示</p>
<p>prompt that assigns a role to the system, can also have a context. 也可以包含上下文。</p>
<p>However, each type of prompt serves a slightly different primary purpose: 然而，每种提示类型的主要目的略有不同：</p>
<ul>
<li>System prompt: Defines the model’s fundamental capabilities and overarching purpose. • 系统提示：定义模型的基本能力和总体目标。</li>
<li>Contextual prompt: Provides immediate, task-specific information to guide the response. • 上下文提示：提供即时的、针对特定任务的信息以指导响应。它高度针对当前任务或输入，</li>
</ul>
<p>It’s highly specific to the current task or input, which is dynamic. 具有动态性。</p>
<ul>
<li>Role prompt: Frames the model’s output style and voice. It adds a layer of specificity • 角色提示：框定模型的输出风格和语气。它增加了一层特定性和个性。</li>
</ul>
<p>and personality.</p>
<p>February 2025 18 2025年2月 18</p>`
    },
    {
      title: 'System prompting 系统提示',
      level: 1,
      content: `<p>Prompt Engineering Prompt Engineering</p>
<p>Distinguishing between system, contextual, and role prompts provides a framework for 区分系统提示、上下文提示和角色提示为设计具有明确意图的提示提供了框架，允许灵活组合，</p>
<p>designing prompts with clear intent, allowing for flexible combinations and making it easier to 并使分析每种提示类型如何影响语言模型的输出变得更容易。</p>
<p>analyze how each prompt type influences the language model’s output.</p>
<p>Let’s dive into these three different kinds of prompts. 让我们深入了解这三种不同类型的提示。</p>
<p>System prompting 系统提示</p>
<p>Table 3 contains a system prompt, where I specify additional information on how to return the 表3包含一个系统提示，我在其中指定了如何返回输出的附加信息。我提高了温度以获得更高的</p>
<p>output. I increased the temperature to get a higher creativity level, and I specified a higher 创造力水平，并且指定了更高的令牌限制。然而，由于我对如何返回输出的明确指示，模型没有</p>
<p>token limit. However, because of my clear instruction on how to return the output the model 返回额外的文本。</p>
<p>didn’t return extra text.</p>
<p>Goal Classify movie reviews as positive, neutral or negative. Goal 将电影评论分类为正面、中性或负面。</p>
<p>Model gemini-pro 模型 gemini-pro</p>
<p>Temperature 1 Token Limit 5 温度 1 令牌限制 5</p>
<p>Top-K 40 Top-P 0.8 Top-K 40 Top-P 0.8</p>
<p>Prompt Classify movie reviews as positive, neutral or negative. Only 提示 Classify movie reviews as positive, neutral or negative. Only</p>
<p>return the label in uppercase. return the label in uppercase.</p>
<p>Review: &quot;Her&quot; is a disturbing study revealing the direction Review: &quot;Her&quot; is a disturbing study revealing the direction</p>
<p>humanity is headed if AI is allowed to keep evolving, humanity is headed if AI is allowed to keep evolving,</p>
<p>unchecked. It&#x27;s so disturbing I couldn&#x27;t watch it. unchecked. It&#x27;s so disturbing I couldn&#x27;t watch it.</p>
<p>Sentiment: Sentiment:</p>
<p>Output NEGATIVE 输出 负面</p>
<p>Table 3. An example of system prompting 表3. 系统提示的一个示例</p>
<p>System prompts can be useful for generating output that meets specific requirements. The 系统提示对于生成符合特定要求的输出非常有用。“系统提示”这个名称实际上代表“向系</p>
<p>name ‘system prompt’ actually stands for ‘providing an additional task to the system’. For 统提供额外任务”。例如，你可以使用系统提示生成与特定编程语言兼容的代码片段，或者使</p>
<p>example, you could use a system prompt to generate a code snippet that is compatible with 用系统提示返回某种特定结构。请参见表4，我在其中以JSON格式返回输出。</p>
<p>a specific programming language, or you could use a system prompt to return a certain</p>
<p>structure. Have a look into Table 4, where I return the output in JSON format.</p>
<p>February 2025 19 2025年2月 19</p>
<p>Prompt Engineering Prompt Engineering</p>
<p>Goal Classify movie reviews as positive, neutral or negative, return JSON. Goal 将电影评论分类为正面、中性或负面，返回JSON。</p>
<p>Model gemini-pro 模型 双子座‑pro</p>
<p>Temperature 1 Token Limit 1024 温度 1 令牌限制 1024</p>
<p>Top-K 40 Top-P 0.8 Top-K 40 Top-P 0.8</p>
<p>Prompt Classify movie reviews as positive, neutral or negative. Return 提示词 Classify movie reviews as positive, neutral or negative. Return</p>
<p>valid JSON: valid JSON:</p>
<p>Review: &quot;Her&quot; is a disturbing study revealing the direction Review: &quot;Her&quot; is a disturbing study revealing the direction</p>
<p>humanity is headed if AI is allowed to keep evolving, humanity is headed if AI is allowed to keep evolving，</p>
<p>unchecked. It&#x27;s so disturbing I couldn&#x27;t watch it. unchecked. It&#x27;s so disturbing I couldn&#x27;t watch it.</p>
<p>Schema: Schema:</p>
<p>\`\`\` \`\`\`</p>
<p>MOVIE: MOVIE:</p>
<p>{ {</p>
<p>&quot;sentiment&quot;: String &quot;POSITIVE&quot; | &quot;NEGATIVE&quot; | &quot;NEUTRAL&quot;, &quot;sentiment&quot;: String &quot;POSITIVE&quot; | &quot;NEGATIVE&quot; | &quot;NEUTRAL&quot;，</p>
<p>&quot;name&quot;: String &quot;name&quot;: String</p>
<p>} }</p>
<p>MOVIE REVIEWS: MOVIE REVIEWS:</p>
<p>{ {</p>
<p>&quot;movie_reviews&quot;: [MOVIE] &quot;movie_reviews&quot;: [MOVIE]</p>
<p>} }</p>
<p>\`\`\` \`\`\`</p>
<p>JSON Response: JSON Response:</p>
<p>Output \`\`\` 输出 \`\`\`</p>
<p>{ {</p>
<p>&quot;movie_reviews&quot;: [ &quot;movie_reviews&quot;: [</p>
<p>{ {</p>
<p>&quot;sentiment&quot;: &quot;NEGATIVE&quot;, &quot;sentiment&quot;: &quot;NEGATIVE&quot;,</p>
<p>&quot;name&quot;: &quot;Her&quot; &quot;name&quot;: &quot;Her&quot;</p>
<p>} }</p>
<p>] ]</p>
<p>} }</p>
<p>\`\`\` \`\`\`</p>
<p>Table 4. An example of system prompting with JSON format 表4. 使用JSON格式的系统提示示例</p>
<p>February 2025 20 2025年2月 20</p>
<p>Prompt Engineering Prompt Engineering</p>
<p>There are some benefits in returning JSON objects from a prompt that extracts data. In 从提取数据的提示中返回JSON对象有一些好处。在实际应用中，我不需要手动创建这种</p>
<p>a real-world application I don’t need to manually create this JSON format, I can already JSON格式，我已经可以按排序顺序返回数据（处理日期时间对象时非常方便），但最重要的</p>
<p>return the data in a sorted order (very handy when working with datetime objects), but most 是，通过提示JSON格式，它强制模型创建结构并限制幻觉。</p>
<p>importantly, by prompting for a JSON format it forces the model to create a structure and</p>
<p>limit hallucinations.</p>
<p>System prompts can also be really useful for safety and toxicity. To control the output, simply 系统提示对于安全性和毒性控制也非常有用。要控制输出，只需在提示中添加一行，例如：“你</p>
<p>add an additional line to your prompt like: ‘You should be respectful in your answer.’. 的回答应当尊重他人。”</p>
<p>Role prompting 角色提示</p>
<p>Role prompting is a technique in prompt engineering that involves assigning a specific role to 角色提示是一种提示工程技术，涉及为生成式人工智能模型分配特定角色。这可以帮助模型生成</p>
<p>the gen AI model. This can help the model to generate more relevant and informative output, 更相关且信息丰富的输出，因为模型可以根据被分配的特定角色来构建其响应。</p>
<p>as the model can craft its responses to the specific role that it has been assigned.</p>
<p>For example, you could role prompt a gen AI model to be a book editor, a kindergarten 例如，你可以将生成式人工智能模型角色提示为图书编辑、幼儿园教师或励志演讲者。一旦模</p>
<p>teacher, or a motivational speaker. Once the model has been assigned a role, you can then 型被分配了角色，你就可以给它与该角色相关的提示。例如，你可以提示教师创建一个课程计</p>
<p>give it prompts that are specific to that role. For example, you could prompt a teacher to 划，然后进行审查。请查看表5，其中模型扮演旅行导游的角色。</p>
<p>create a lesson plan that they can then review. Have a look into Table 5, where the model</p>
<p>takes the role of a travel guide.</p>
<p>February 2025 21 2025年2月 21</p>`
    },
    {
      title: 'Model gemini-pro 模型 双子座专业版',
      level: 1,
      content: `<p>Prompt Engineering Prompt Engineering</p>
<p>Goal Act as travel guide and provide 3 travel suggestions Goal 充当导游并提供3个旅行建议</p>
<p>Model gemini-pro 模型 双子座专业版</p>
<p>Temperature 1 Token Limit 1024 温度 1 令牌限制 1024</p>
<p>Top-K 40 Top-P 0.8 Top-K 40 Top-P 0.8</p>
<p>Prompt I want you to act as a travel guide. I will write to you 提示词 I want you to act as a travel guide. I will write to you</p>
<p>about my location and you will suggest 3 places to visit near about my location and you will suggest 3 places to visit near</p>
<p>me. In some cases, I will also give you the type of places I me. In some cases, I will also give you the type of places I</p>
<p>will visit. will visit.</p>
<p>My suggestion: &quot;I am in Amsterdam and I want to visit My suggestion: &quot;I am in Amsterdam and I want to visit</p>
<p>only museums.&quot; only museums.&quot;</p>
<p>Travel Suggestions: Travel Suggestions:</p>
<p>Output 1. Rijksmuseum: World-renowned museum, known for Dutch masterpieces 输出 1. 国立博物馆：世界著名博物馆，以荷兰杰作闻名</p>
<p>like Rembrandt’s “The Night Watch.” Don’t miss the incredible collection of 像伦勃朗的《夜巡》一样。不要错过令人难以置信的收藏</p>
<p>paintings and artifacts showcasing Dutch art and history. 展示荷兰艺术和历史的绘画和文物。</p>
<ul>
<li>2. Van Gogh Museum: Immerse yourself in the captivating works of Vincent 2. 梵高博物馆：沉浸于文森特·梵高引人入胜的作品中。</li>
</ul>
<p>van Gogh. The museum houses the largest collection of his paintings and 博物馆收藏了他最多的绘画和素描作品，</p>
<p>drawings, including “The Starry Night” and “Sunflowers.” 包括《星夜》和《向日葵》。</p>
<ul>
<li>3. Stedelijk Museum Amsterdam: Discover modern and contemporary art 3. 阿姆斯特丹市立博物馆：探索现代和当代艺术</li>
</ul>
<p>from around the world. The museum’s collection includes works by Picasso, 来自世界各地。博物馆的收藏包括毕加索的作品，</p>
<p>Kandinsky, and Rietveld, housed in a striking modern building. 康定斯基和里特维尔德的作品，收藏于一座引人注目的现代建筑中。</p>
<p>Table 5. An example of role prompting 表5. 角色提示的示例</p>
<p>The above example shows an example of taking the role of a travel agent. When you 上述示例展示了扮演旅行社角色的例子。当你将角色改为地理教师时，你会注意到你会收到</p>
<p>would change the role to a teacher of geography, you would notice that you will receive a 不同的回应。</p>
<p>different response.</p>
<p>Defining a role perspective for an AI model gives it a blueprint of the tone, style, and focused 为AI模型定义角色视角，为其提供了语气、风格和专注专业知识的蓝图，从而提升输出的质量、</p>
<p>expertise you’re looking for to improve the quality, relevance, and effectiveness of your 相关性和有效性。</p>
<p>output.</p>
<p>February 2025 22 2025年2月 22</p>
<p>Prompt Engineering Prompt Engineering</p>
<p>Here are some styles you can choose from which I find effective: 这里有一些我认为有效的风格供你选择：</p>
<p>Confrontational, Descriptive, Direct, Formal, Humorous, Influential, Informal, 对抗性，描述性，直接，正式，幽默，有影响力，非正式，</p>
<p>Inspirational, Persuasive Inspirational, Persuasive</p>
<p>Let’s change our prompt in Table 6 to include a humorous and inspirational style. 让我们将表6中的提示改为包含幽默和鼓舞人心的风格。</p>
<p>Prompt I want you to act as a travel guide. I will write to you about 提示 I want you to act as a travel guide. I will write to you about</p>
<p>my location and you will suggest 3 places to visit near me in my location and you will suggest 3 places to visit near me in</p>
<p>a humorous style. a humorous style.</p>
<p>My suggestion: &quot;I am in Manhattan.&quot; My suggestion: &quot;I am in Manhattan.&quot;</p>
<p>Travel Suggestions: Travel Suggestions:</p>
<p>Output 1. Behold the Empire State of Mind: Ascend to the dizzying heights of the Empire 输出 1. 领略帝国大厦的精神：登上帝国大厦的惊人高度 e</p>
<p>State Building and bask in the glory of Manhattan&#x27;s skyline. Prepare to feel like 并沐浴在曼哈顿天际线的辉煌中。准备好感受</p>
<p>King Kong atop the Big Apple, minus the giant ape-sized banana. 像站在大苹果上的金刚一样，当然没有巨型猩猩大小的香蕉。</p>
<ul>
<li>2. Get Artsy-Fartsy at MoMA: Unleash your inner art aficionado at the Museum 2. 在现代艺术博物馆释放艺术气息：释放你内心的艺术爱好者</li>
</ul>
<p>of Modern Art (MoMA). Gaze upon masterpieces that will boggle your 在现代艺术博物馆（MoMA）欣赏那些让你大开眼界的杰作，让你怀</p>
<p>mind and make you question whether your stick-figure drawings have any 疑自己的简笔画是否 any</p>
<p>artistic merit. 艺术价值。</p>
<ul>
<li>3. Shop ‘Til You Drop on Fifth Avenue: Indulge in some retail therapy on the 3. 在第五大道疯狂购物：尽情享受购物疗法，</li>
</ul>
<p>iconic Fifth Avenue. Brace yourself for sticker shock as you window-shop (or 著名的第五大道。准备好面对价格震惊，无论是橱窗购物（还是</p>
<p>actually shop) at designer boutiques that will make your wallet cry. But hey, 真正购物）在那些会让你的钱包哭泣的设计师精品店。但嘿，</p>
<p>you’re in Manhattan, so you might as well embrace the fabulousness! 你身处曼哈顿，所以不妨尽情拥抱这份华丽！</p>
<p>Table 6. An example of role prompting with a humorous tone and style 表6. 一个带有幽默语气和风格的角色提示示例</p>
<p>Contextual prompting 上下文提示</p>
<p>By providing contextual prompts, you can help ensure that your AI interactions are as 通过提供上下文提示，您可以帮助确保与 AI 的交互尽可能顺畅和高效。模型能够更快地理解您</p>
<p>seamless and efficient as possible. The model will be able to more quickly understand your 的请求，并生成更准确且相关的响应，正如表 7 的示例所示。</p>
<p>request and be able to generate more accurate and relevant responses, as you can see in the</p>
<p>example of Table 7.</p>
<p>February 2025 23 2025年2月 23</p>
<p>Prompt Engineering Prompt Engineering</p>
<p>Goal Suggest articles for a blog about retro games Goal 为复古游戏博客推荐文章</p>
<p>Model gemini-pro 模型 双子座专业版</p>
<p>Temperature 1 Token Limit 1024 温度 1 令牌限制 1024</p>
<p>Top-K 40 Top-P 0.8 Top-K 40 Top-P 0.8</p>
<p>Prompt Context: You are writing for a blog about retro 80&#x27;s arcade 提示词 Context: You are writing for a blog about retro 80&#x27;s arcade</p>
<p>video games. video games.</p>
<p>Suggest 3 topics to write an article about with a few lines of Suggest 3 topics to write an article about with a few lines of</p>
<p>description of what this article should contain. description of what this article should contain.</p>
<p>Output 1. **The Evolution of Arcade Cabinet Design:** 输出 1. **街机机柜设计的演变：**</p>
<p>This article would explore the evolution of arcade cabinet designs, from the 本文将探讨街机机柜设计的演变，</p>
<p>early wood and metal cabinets of the 1970s to the sleek, neon-lit designs of 从1970年代早期的木质和金属机柜到时尚的霓虹灯设计，</p>
<p>the 1980s and beyond. 1980年代及以后。</p>
<ul>
<li>2. **Blast From The Past: Iconic Arcade Games of The 80’s:** 2. **怀旧经典：80年代标志性街机游戏：**</li>
<li>This article would feature a glimpse into the history, impact, and legacy ‑ 这篇文章将展示历史、影响和遗产的概览</li>
</ul>
<p>of some of the most iconic and influential arcade games of the 1980s, 一些1980年代最具标志性和影响力的街机游戏，</p>
<p>highlighting their innovations, popular mechanics, and enduring charm. 突出他们的创新、流行机械和持久魅力。</p>
<ul>
<li>3. **The Rise and Retro Revival of Pixel Art:** 3. **像素艺术的兴起与复古复兴：**</li>
<li>This article would delve into the evolution of pixel art as a defining visual ‑ 本文将深入探讨像素艺术作为早期街机游戏标志性视觉风格的发展</li>
</ul>
<p>style of early arcade games, tracing its roots, exploring its techniques, and 的演变，追溯其起源，探索其技术，并</p>
<p>discussing the resurgence of pixel art in modern games and digital art. 讨论像素艺术在现代游戏和数字艺术中的复兴。</p>
<p>Table 7. An example of contextual prompting 表7. 一个上下文提示的示例</p>
<p>February 2025 24 2025年2月 24</p>`
    },
    {
      title: 'Step-back prompting 后退式提示',
      level: 1,
      content: `<p>Prompt Engineering Prompt Engineering</p>
<p>Step-back prompting 后退式提示</p>
<p>Step-back8 prompting is a technique for improving the performance by prompting the LLM 后退式提示是一种通过先让大型语言模型（LLM）考虑与具体任务相关的一般性问题，然后将</p>
<p>to first consider a general question related to the specific task at hand, and then feeding the 该一般性问题的答案输入到后续针对具体任务的提示中的技术，以提升性能。这种“后退”使</p>
<p>answer to that general question into a subsequent prompt for the specific task. This ‘step 得LLM能够在尝试解决具体问题之前激活相关的背景知识和推理过程。</p>
<p>back’ allows the LLM to activate relevant background knowledge and reasoning processes</p>
<p>before attempting to solve the specific problem.</p>
<p>By considering the broader and underlying principles, LLMs can generate more accurate and 通过考虑更广泛和潜在的原则，LLM能够生成更准确且富有洞察力的回答。后退式提示鼓励</p>
<p>insightful responses. Step-back prompting encourages LLMs to think critically and apply their LLM进行批判性思考，并以新的创造性方式应用其知识。它通过利用LLM参数中更多的知识，</p>
<p>knowledge in new and creative ways. It changes the final prompt doing the task by utilizing 改变了执行任务的最终提示，相较于直接提示LLM时能调动的知识更多。</p>
<p>more knowledge in the LLM’s parameters than would otherwise come into play when the LLM</p>
<p>is prompted directly.</p>
<p>It can help to mitigate biases in LLM responses, by focusing on general principles instead of 通过关注一般原则而非具体细节，后退式提示可以帮助减轻大型语言模型回答中的偏见。</p>
<p>specific details, step-back prompting.</p>
<p>Let’s have a look into these examples to understand how step-back prompting can improve 让我们通过这些示例来了解后退式提示如何改善结果。我们先回顾一个传统提示（表8），然</p>
<p>the results. Let’s first review a traditional prompt (Table 8) before we compare it to a step 后再将其与后退式提示（表9）进行比较：</p>
<p>back prompt (Table 9):</p>
<p>February 2025 25 2025年2月 25</p>
<p>Prompt Engineering Prompt Engineering</p>
<p>Goal Write a storyline for a level of a first-person shooter video game. Goal 为第一人称射击游戏的一个关卡编写故事情节。</p>
<p>Model gemini-pro 模型 双子座专业版</p>
<p>Temperature 1 Token Limit 1024 温度 1 令牌限制 1024</p>
<p>Top-K 40 Top-P 0.8 Top-K 40 Top-P 0.8</p>
<p>Prompt Write a one paragraph storyline for a new level of a first- 提示 Write a one paragraph storyline for a new level of a first-</p>
<p>person shooter video game that is challenging and engaging. person shooter video game that is challenging and engaging.</p>
<p>Output The level begins with the player’s squad being ambushed in a dense urban area 输出 关卡开始时，玩家的小队在一个密集的城市区域遭到伏击</p>
<p>by a relentless enemy faction. Players must fight their way through a maze of 由一个无情的敌对派系发动。玩家必须穿过迷宫般的</p>
<p>back alleys and dilapidated buildings, utilizing stealth and precision to eliminate 后巷和破旧的建筑，利用潜行和精准消灭</p>
<p>enemy forces and avoid detection. The player must use their environment to their 敌军并避免被发现。玩家必须利用环境 r</p>
<p>advantage, setting traps, utilizing cover, and making calculated moves to survive. 来取得优势，设置陷阱，利用掩护，并做出精心计算的行动以求生存 .</p>
<p>Along the way, they uncover intel suggesting the enemy is planning a devastating ong eway, eyuncover n e sugges ng eenemy spannnga evas a ng</p>
<p>attack, and the player must race against time to gather evidence and relay it back 攻击，玩家必须与时间赛跑，收集证据并传回 k</p>
<p>to their headquarters before the enemy can carry out their plans. 他们的总部，以防敌人实施计划。</p>
<p>Table 8. A traditional prompt before we compare it with a step back prompt 表8. 传统提示，与后退一步提示的比较</p>
<p>When you set the temperature to 1, you might end up with all kinds of creative writings for a 当你将温度设置为1时，可能会得到各种创意写作的故事情节，但它也相当随机且通用。所以</p>
<p>storyline, but it’s also quite random and generic. So let’s take a step back: 让我们后退一步：</p>
<p>February 2025 26 2025年2月 26</p>
<p>Prompt Engineering Prompt Engineering</p>
<p>Prompt Based on popular first-person shooter action games, what are 提示 Based on popular first-person shooter action games, what are</p>
<p>5 fictional key settings that contribute to a challenging and 5 fictional key settings that contribute to a challenging and</p>
<p>engaging level storyline in a first-person shooter video game? engaging level storyline in a first-person shooter video game?</p>
<p>Output 1. **Abandoned Military Base**: A sprawling, post-apocalyptic military complex 输出 1. **废弃的军事基地**：一个广阔的后末日军事基地</p>
<p>crawling with mutated soldiers and rogue robots, ideal for challenging 爬满了变异士兵和流氓机器人，非常适合挑战</p>
<p>firearm combat. 火器战斗。</p>
<ul>
<li>2. **Cyberpunk City**: A neon-lit, futuristic urban environment with towering 2. **赛博朋克城市**：一个霓虹灯照亮的未来都市环境，拥有高耸的</li>
</ul>
<p>skyscrapers and dense alleyways, featuring cybernetically enhanced enemies 摩天大楼和密集的小巷，特色是拥有赛博增强敌人</p>
<p>and hacking mechanics. 以及破解机制。</p>
<ul>
<li>3. **Alien Spaceship**: A vast alien vessel stranded on Earth, with eerie 3. **外星飞船**：一艘巨大的外星飞船搁浅在地球上，拥有诡异的</li>
</ul>
<p>corridors, zero-gravity sections, and extraterrestrial creatures to encounter. 走廊、零重力区域和需要遭遇的外星生物。</p>
<ul>
<li>4. **Zombie-Infested Town**: A desolate town overrun by hordes of aggressive 4. **僵尸横行的小镇**：一个被大量凶猛僵尸占领的荒废小镇，</li>
</ul>
<p>zombies, featuring intense close-quarters combat and puzzle-solving to find 包含激烈的近身战斗和解谜以寻找</p>
<p>safe passage. 安全通道。</p>
<ul>
<li>5. **Underwater Research Facility**: A deep-sea laboratory flooded with water, 5. **水下研究设施**：一个被水淹没的深海实验室，</li>
</ul>
<p>filled with mutated aquatic creatures, and requiring stealth and underwater 充满了变异的水生生物，需要隐秘和水下探索技能才能生存。</p>
<p>exploration skills to survive. 需要隐秘和水下探索技能才能生存。</p>
<p>Table 9. An example of prompting for self consistency 表9. 自洽提示的一个示例</p>
<p>Yeah those topics seem like a good fit for a first-person video game. Let’s go back to the 是的，这些主题似乎很适合第一人称视频游戏。让我们回到最初的提示，但这次我们将退一步的</p>
<p>original prompt, but this time we include the answer of the step back as context and see what 答案作为上下文，看看它会返回什么。</p>
<p>it will return.</p>
<p>February 2025 27 2025年2月 27</p>`
    },
    {
      title: 'Prompt Context: 5 engaging themes for a ',
      level: 1,
      content: `<p>Prompt Engineering Prompt Engineering</p>
<p>Prompt Context: 5 engaging themes for a first person shooter video game: 提示 Context: 5 engaging themes for a first person shooter video game:</p>
<ul>
<li>1. **Abandoned Military Base**: A sprawling, post-apocalyptic 1. **Abandoned Military Base**: A sprawling, post-apocalyptic</li>
</ul>
<p>military complex crawling with mutated soldiers and rogue military complex crawling with mutated soldiers and rogue</p>
<p>robots, ideal for challenging firearm combat. robots, ideal for challenging firearm combat.</p>
<ul>
<li>2. **Cyberpunk City**: A neon-lit, futuristic urban environment 2. **Cyberpunk City**: A neon-lit, futuristic urban environment</li>
</ul>
<p>with towering skyscrapers and dense alleyways, featuring with towering skyscrapers and dense alleyways, featuring</p>
<p>cybernetically enhanced enemies and hacking mechanics. cybernetically enhanced enemies and hacking mechanics.</p>
<ul>
<li>3. **Alien Spaceship**: A vast alien vessel stranded on 3. **Alien Spaceship**: A vast alien vessel stranded on</li>
</ul>
<p>Earth, with eerie corridors, zero-gravity sections, and Earth, with eerie corridors, zero-gravity sections, and</p>
<p>extraterrestrial creatures to encounter. extraterrestrial creatures to encounter.</p>
<ul>
<li>4. **Zombie-Infested Town**: A desolate town overrun by hordes of 4. **Zombie-Infested Town**: A desolate town overrun by hordes of</li>
</ul>
<p>aggressive zombies, featuring intense close-quarters combat and aggressive zombies, featuring intense close-quarters combat and</p>
<p>puzzle-solving to find safe passage. puzzle-solving to find safe passage.</p>
<ul>
<li>5. **Underwater Research Facility**: A deep-sea laboratory flooded 5. **Underwater Research Facility**: A deep-sea laboratory flooded</li>
</ul>
<p>with water, filled with mutated aquatic creatures, and requiring with water, filled with mutated aquatic creatures, and requiring</p>
<p>stealth and underwater exploration skills to survive. stealth and underwater exploration skills to survive.</p>
<p>Take one of the themes and write a one paragraph storyline Take one of the themes and write a one paragraph storyline</p>
<p>for a new level of a first-person shooter video game that is for a new level of a first-person shooter video game that is</p>
<p>challenging and engaging. challenging and engaging.</p>
<p>Output In the heart of a murky abyss, lies a dilapidated underwater research facility, 输出 在阴暗深渊的中心，矗立着一座破败的水下研究设施，</p>
<p>standing as a testament to human ambition and its disastrous consequences. 作为人类野心及其灾难性后果的见证。</p>
<p>Shrouded in darkness, pulsating with the hum of malfunctioning machinery, and 笼罩在黑暗中，伴随着故障机械的嗡嗡声，</p>
<p>haunted by the echoes of drowned souls, the facility is now a breeding ground for 被淹没灵魂的回声所困扰，这个设施如今成为了</p>
<p>a nightmare borne from the deep sea. The player, an elite marine equipped with 一个源自深海的噩梦的滋生地。玩家是一名装备有</p>
<p>advanced diving gear and experimental weaponry, is tasked with venturing into 先进潜水装备和实验性武器的精英海军，任务是深入</p>
<p>this aquatic realm of terror. Armed with resilience and resourcefulness, they must 这个水下恐怖领域。凭借坚韧和机智，他们必须</p>
<p>navigate treacherous corridors, solve cryptic puzzles, and confront gruesome sea 穿越危险的走廊，破解神秘的谜题，并面对可怕的海洋</p>
<p>monstrosities that lurk in the depths. From grappling with the crushing pressure 潜伏在深处的怪物。从应对巨大的压力</p>
<p>of the deep sea to outsmarting cunning aquatic predators, every moment in this 到智胜狡猾的水生捕食者，这个</p>
<p>uncharted underworld tests the limits of human endurance and courage. 未知的水下世界考验着人类的耐力和勇气极限。</p>
<p>Table 10. An example of prompting for self consistency Table 10. An example of prompting for self consistency</p>
<p>That looks like an interesting video game! By using step back prompting techniques you can 那看起来像是一个有趣的视频游戏！通过使用回退提示技术，你可以提高提示的准确性。</p>
<p>increase the accuracy of your prompts.</p>
<p>February 2025 28 2025年2月 28</p>
<p>Prompt Engineering Prompt Engineering</p>
<p>Chain of Thought (CoT) Chain of Thought (CoT)</p>
<p>Chain of Thought (CoT) 9 prompting is a technique for improving the reasoning capabilities 链式思维（CoT）提示是一种通过生成中间推理步骤来提升大型语言模型（LLM）推理能力</p>
<p>of LLMs by generating intermediate reasoning steps. This helps the LLM generate more 的技术。这有助于LLM生成更准确的答案。你可以将其与少样本提示结合使用，以在需要推理</p>
<p>accurate answers. You can combine it with few-shot prompting to get better results on more 后再回答的更复杂任务上获得更好的结果，因为零样本链式思维是一个挑战。</p>
<p>complex tasks that require reasoning before responding as it’s a challenge with a zero-shot</p>
<p>chain of thought.</p>
<p>CoT has a lot of advantages. First of all, it’s low-effort while being very effective and works 链式思维有很多优点。首先，它低成本且非常有效，并且适用于现成的LLM（无需微调）。使</p>
<p>well with off-the-shelf LLMs (so no need to finetune). You also get interpretability with CoT 用链式思维提示还能获得可解释性，因为你可以从LLM的回答中学习并看到所遵循的推理步骤。</p>
<p>prompting, as you can learn from the LLM’s responses and see the reasoning steps that were 如果出现故障，你能够识别出来。链式思维似乎在不同LLM版本之间切换时提高了鲁棒性。这</p>
<p>followed. If there’s a malfunction, you will be able to identify it. Chain of thought appears 意味着你的提示在不同LLM之间的性能漂移会比不使用推理链的提示更小。当然，也存在一些</p>
<p>to improve robustness when moving between different LLM versions. Which means the 缺点，但它们比较直观。</p>
<p>performance of your prompt should drift less between different LLMs than if your prompt</p>
<p>does not use reasoning chains. Of course there are also disadvantages, but they are</p>
<p>somewhat intuitive.</p>
<p>The LLM response includes the chain of thought reasoning, which means more output LLM的回答包含链式思维推理，这意味着输出的token更多，预测成本更高且耗时更长。</p>
<p>tokens, which means predictions cost more money and take longer.</p>
<p>To explain the following example in Table 11, let’s first try to create a prompt that is not using 为了说明表11中的示例，我们先尝试创建一个不使用链式思维提示（CoT prompting）的提</p>
<p>CoT prompting to showcase the flaws of a large language model. 示，以展示大型语言模型的缺陷。</p>
<p>Prompt When I was 3 years old, my partner was 3 times my age. Now, I 提示 When I was 3 years old, my partner was 3 times my age. Now, I</p>
<p>am 20 years old. How old is my partner? am 20 years old. How old is my partner?</p>
<p>Output 63 years old 输出 63岁</p>
<p>Table 11. An example of a prompt which is trying to solve a mathematical problem 表11. 试图解决数学问题的提示示例</p>
<p>February 2025 29 2025年2月 29</p>
<p>Prompt Engineering Prompt Engineering</p>
<p>Yikes. That’s obviously the wrong answer. As a matter of fact, LLMs often struggle with 哎呀。这显然是错误的答案。事实上，大型语言模型（LLM）在数学任务上经常表现不佳，甚</p>
<p>mathematical tasks and can provide incorrect answers – even for a task as simple as 至在像乘两个数字这样简单的任务中也可能给出错误答案。这是因为它们是基于大量文本训练</p>
<p>multiplying two numbers. This is because they are trained on large volumes of text and math 的，而数学可能需要不同的方法。所以让我们看看中间推理步骤是否能改善输出。</p>
<p>may require a different approach. So let’s see if intermediate reasoning steps will improve</p>
<p>the output.</p>
<p>Prompt When I was 3 years old, my partner was 3 times my age. Now, 提示 When I was 3 years old, my partner was 3 times my age. Now,</p>
<p>I am 20 years old. How old is my partner? Let&#x27;s think step I am 20 years old. How old is my partner? Let&#x27;s think step</p>
<p>by step. by step.</p>
<p>Output 1. Let’s assume my current age is “x” years. 输出 1. 假设我当前的年龄是“x”岁。</p>
<ul>
<li>2. When I was 3 years old, my age was 3 years. 2. 当我3岁时，我的年龄是3岁。</li>
<li>3. My partner’s age at that time was 3 times my age, which means my partner’s 3. 那时我伴侣的年龄是我的3倍，这意味着我伴侣的年龄是3 * 3 = 9 岁。</li>
</ul>
<p>age was 3 * 3 = 9 years.</p>
<ul>
<li>4. Now, I am 20 years old, which means my age has increased by 20 - 3 = 17 4. 现在，我20岁了，这意味着我的年龄增加了20 ‑ 3 = 17</li>
</ul>
<p>years since I was 3 years old. 自我3岁以来的年数。</p>
<ul>
<li>5. Since my partner’s age was 9 years when I was 3 years old, and my age has 5. 由于当我3岁时，我伴侣的年龄是9岁，而我的年龄增加了17年，我伴侣的年</li>
</ul>
<p>increased by 17 years, my partner’s age must have also increased by 17 years. 龄也必须增加17年 s.</p>
<ul>
<li>6. Therefore, my partner’s current age is 9 + 17 = 26 years. 6. 因此，我伴侣当前的年龄是9 + 17 = 26 岁。</li>
</ul>
<p>So, my partner is 26 years old. 所以，我的伴侣是26岁。</p>
<p>Table 12. An example of Chain of Thought prompting 表12. 思维链提示的一个示例</p>
<p>Alright, now the final answer is correct. That’s because we clearly instructed the LLM to 好了，现在最终答案是正确的。那是因为我们明确指示了大型语言模型解释每一步，而不仅仅</p>
<p>explain each step instead of just returning an answer. It’s interesting to see that the model 是给出答案。有趣的是，模型将增加的17年加了起来。在我脑海中，我会计算我和伴侣之间的</p>
<p>adds up the 17 increased years. In my head I would take the difference of years between my 年龄差并将其相加。（20+(9‑3)）。让我们帮助模型更像我一样思考。</p>
<p>partner and me and add those up. (20+(9-3)). Let’s help the model to think a little bit more</p>
<p>like me.</p>
<p>February 2025 30 2025年2月 30</p>`
    }
  ]
};

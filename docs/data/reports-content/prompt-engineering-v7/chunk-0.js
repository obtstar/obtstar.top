// 报告: prompt-engineering-v7 - 第0块
// 页数: 1-15

window.REPORT_CHUNK_prompt_engineering_v7_0 = {
  reportId: "prompt-engineering-v7",
  chunkIndex: 0,
  pageRange: "1-15",
  sections: [
    {
      title: 'Prompt',
      level: 1,
      content: `<p>Prompt</p>
<p>提示工程</p>
<p>Engineering</p>
<p>Author: Lee Boonstra 作者：Lee Boonstra</p>
<p>Prompt Engineering Prompt Engineering</p>
<p>Acknowledgements</p>
<p>致谢</p>
<p>Content contributors 内容贡献者</p>
<p>Michael Sherman Michael Sherman</p>
<p>Yuan Cao Yuan Cao</p>
<p>Erick Armbrust Erick Armbrust</p>
<p>Anant Nawalgaria Anant Nawalgaria</p>
<p>Antonio Gulli Antonio Gulli</p>
<p>Simone Cammel Simone Cammel</p>
<p>Curators and Editors 策展人和编辑</p>
<p>Antonio Gulli Anant</p>
<p>Antonio Gulli</p>
<p>Nawalgaria Grace</p>
<p>Anant Nawalgaria</p>
<p>Mollison</p>
<p>Grace Mollison</p>
<p>Technical Writer 技术撰稿人 Joey</p>
<p>Haymaker</p>
<p>Joey Haymaker</p>
<p>Designer Designer</p>
<p>Michael Lanning Michael Lanning</p>
<p>February 2025 2 2025年2月 2</p>
<p>Table of contents Table of contents</p>
<p>Introduction 6 Introduction 6</p>
<p>Prompt engineering 7 提示工程 7</p>
<p>LLM output configuration 8</p>
<p>大型语言模型输出配置</p>
<p>8</p>
<p>Output length 8 输出长度 8</p>
<p>Sampling controls 9 采样控制 9</p>
<p>Temperature 9 Temperature 9</p>
<p>Top-K and top-P 10 Top‑K 和 Top‑P 10 综合应用 1</p>
<p>Putting it all together 11 1</p>
<p>Prompting techniques 13 Prompting techniques 13</p>
<p>General prompting / zero shot 13 通用提示 / 零样本 13</p>
<p>One-shot &amp; few-shot 15 一次性示例与少量示例 15</p>
<p>System, contextual and role prompting 18 系统提示、上下文提示与角色提示 18</p>
<p>System prompting 19 System prompting 19</p>
<p>Role prompting 21 角色提示 21</p>
<p>Contextual prompting 23 上下文提示 23</p>`
    },
    {
      title: 'Step-back prompting 25 回退提示 25',
      level: 1,
      content: `<p>Step-back prompting 25 回退提示 25</p>
<p>Chain of Thought (CoT) 29 思维链（CoT） 29</p>
<p>Self-consistency 32 自洽性 32</p>
<p>Tree of Thoughts (ToT) 36 Tree of Thoughts (ToT) 36</p>
<p>ReAct (reason &amp; act) 37 ReAct（推理与行动） 37</p>
<p>Automatic Prompt Engineering 40 自动提示工程 40</p>
<p>Code prompting 42 代码提示 42</p>
<p>Prompts for writing code 42 编写代码的提示 42</p>
<p>Prompts for explaining code 44 解释代码的提示 44</p>
<p>Prompts for translating code 46 翻译代码的提示 46</p>
<p>Prompts for debugging and reviewing code 48 调试和审查代码的提示 48 多模态提示怎么样？ 54</p>
<p>What about multimodal prompting? 54</p>
<p>Best Practices 54 最佳实践 54</p>
<p>Provide examples 54 提供示例 54</p>
<p>Design with simplicity 55 以简洁为设计原则 55</p>
<p>Be specific about the output 56 明确输出内容 56</p>
<p>Use Instructions over Constraints 56 使用指令而非限制 56</p>
<p>Control the max token length 58 Control the max token length 58</p>
<p>Use variables in prompts 58 在提示中使用变量 58</p>
<p>Experiment with input formats and writing styles 59 尝试不同的输入格式和写作风格 59</p>
<p>For few-shot prompting with classification tasks, mix up the classes 59 对于带分类任务的少样本提示，混合类别 59</p>
<p>Adapt to model updates 60 适应模型更新 60</p>
<p>Experiment with output formats 60 Experiment with output formats 60</p>
<p>JSON Repair 61 JSON 修复 61</p>
<p>Working with Schemas 62 使用模式 62</p>
<p>Experiment together with other prompt engineers 63 与其他提示工程师一起实验 63</p>
<p>CoT Best practices 64 CoT Best practices 64</p>
<p>Document the various prompt attempts 64 记录各种提示尝试 64</p>
<p>Summary 66 Summary 66</p>
<p>Endnotes 68 尾注 68</p>
<p>Prompt Engineering Prompt Engineering</p>
<p>You don’t need to be a data You don’t need to be a data</p>
<p>scientist or a machine learning scientist or a machine learning</p>
<p>engineer – everyone can write engineer – everyone can write</p>
<p>a prompt. a prompt.</p>
<p>Introduction</p>
<p>介绍</p>
<p>When thinking about a large language model input and output, a text prompt (sometimes 在考虑大型语言模型的输入和输出时，文本提示（有时伴随其他模态如图像提示）是模型用来预</p>
<p>accompanied by other modalities such as image prompts) is the input the model uses 测特定输出的输入。你不需要成为数据科学家或机器学习工程师——每个人都可以编写提示。然</p>
<p>to predict a specific output. You don’t need to be a data scientist or a machine learning 而，设计最有效的提示可能很复杂。提示的许多方面都会影响其效果：你使用的模型、模型的训</p>
<p>engineer – everyone can write a prompt. However, crafting the most effective prompt can be 练数据、模型配置、你的用词选择、风格和语气、结构以及上下文都很重要。因此，提示工程是</p>
<p>complicated. Many aspects of your prompt affect its efficacy: the model you use, the model’s 一个迭代过程。不充分的提示可能导致模糊、不准确的回答，并且会阻碍模型提供有意义输出的</p>
<p>training data, the model configurations, your word-choice, style and tone, structure, and 能力。</p>
<p>context all matter. Therefore, prompt engineering is an iterative process. Inadequate prompts</p>
<p>can lead to ambiguous, inaccurate responses, and can hinder the model’s ability to provide</p>
<p>meaningful output.</p>
<p>February 2025 6 2025年2月 6</p>`
    },
    {
      title: 'such as temperature etc.',
      level: 1,
      content: `<p>Prompt Engineering Prompt Engineering</p>
<p>When you chat with the Gemini chatbot,1 you basically write prompts, however this 当你与双子座聊天机器人交流时，基本上是在编写提示，但本白皮书重点介绍如何在 Vertex</p>
<p>whitepaper focuses on writing prompts for the Gemini model within Vertex AI or by using AI 中或通过 API 为双子座模型编写提示，因为直接提示模型可以让你访问诸如温度等配置。</p>
<p>the API, because by prompting the model directly you will have access to the configuration</p>
<p>such as temperature etc.</p>
<p>This whitepaper discusses prompt engineering in detail. We will look into the various 本白皮书详细讨论了提示工程。我们将探讨各种提示技术，帮助你入门，并分享成为提示</p>
<p>prompting techniques to help you getting started and share tips and best practices to 专家的技巧和最佳实践。我们还将讨论在编写提示时可能遇到的一些挑战。</p>
<p>become a prompting expert. We will also discuss some of the challenges you can face</p>
<p>while crafting prompts.</p>
<p>Prompt engineering 提示工程</p>
<p>Remember how an LLM works; it’s a prediction engine. The model takes sequential text as 记住大型语言模型（LLM）的工作原理；它是一个预测引擎。模型以顺序文本作为输入，然后</p>
<p>an input and then predicts what the following token should be, based on the data it was 根据其训练数据预测下一个应该出现的标记。LLM通过不断重复这一过程来运行，将之前预测</p>
<p>trained on. The LLM is operationalized to do this over and over again, adding the previously 的标记添加到顺序文本的末尾，以预测下一个标记。下一个标记的预测基于之前标记之间的关系</p>
<p>predicted token to the end of the sequential text for predicting the following token. The next 以及LLM在训练中见过的内容。</p>
<p>token prediction is based on the relationship between what’s in the previous tokens and what</p>
<p>the LLM has seen during its training.</p>
<p>When you write a prompt, you are attempting to set up the LLM to predict the right sequence 当你编写提示时，你是在尝试设置LLM以预测正确的标记序列。提示工程是设计高质量提示以</p>
<p>of tokens. Prompt engineering is the process of designing high-quality prompts that guide 引导LLM生成准确输出的过程。这个过程包括调整以找到最佳提示，优化提示长度，以及评估</p>
<p>LLMs to produce accurate outputs. This process involves tinkering to find the best prompt, 提示的写作风格和结构与任务的相关性。在自然语言处理和LLM的背景下，提示是提供给模型</p>
<p>optimizing prompt length, and evaluating a prompt’s writing style and structure in relation 以生成响应或预测的输入。</p>
<p>to the task. In the context of natural language processing and LLMs, a prompt is an input</p>
<p>provided to the model to generate a response or prediction.</p>
<p>February 2025 7 2025年2月 7</p>
<p>Prompt Engineering Prompt Engineering</p>
<p>These prompts can be used to achieve various kinds of understanding and generation 这些提示可用于实现各种理解和生成任务，例如文本摘要、信息提取、问答、文本分类、</p>
<p>tasks such as text summarization, information extraction, question and answering, text 语言或代码翻译、代码生成以及代码文档编写或推理。</p>
<p>classification, language or code translation, code generation, and code documentation</p>
<p>or reasoning.</p>
<p>Please feel free to refer to Google’s prompting guides2,3 with simple and effective 欢迎参考谷歌的提示指南2,3，其中包含简单且有效的提示示例。</p>
<p>prompting examples.</p>
<p>When prompt engineering, you will start by choosing a model. Prompts might need to be 在进行提示工程时，您将从选择模型开始。无论您使用的是 Vertex AI 中的 Gemini 语言模型、</p>
<p>optimized for your specific model, regardless of whether you use Gemini language models in GPT、Claude，还是开源模型如 Gemma 或 LLaMA，提示都可能需要针对您的特定模型进行</p>
<p>Vertex AI, GPT, Claude, or an open source model like Gemma or LLaMA. 优化。</p>
<p>Besides the prompt, you will also need to tinker with the various configurations of a LLM. 除了提示词之外，您还需要调整大型语言模型（LLM）的各种配置。</p>
<p>LLM output configuration</p>
<p>LLM 输出配置</p>
<p>Once you choose your model you will need to figure out the model configuration. Most LLMs 一旦选择了模型，您需要确定模型的配置。大多数LLM都带有各种配置选项，用于控制LL</p>
<p>come with various configuration options that control the LLM’s output. Effective prompt M的输出。有效的提示词工程需要为您的任务优化设置这些配置。</p>
<p>engineering requires setting these configurations optimally for your task.</p>
<p>Output length 输出长度</p>
<p>An important configuration setting is the number of tokens to generate in a response. 一个重要的配置设置是响应中生成的标记数量。生成更多标记需要LLM进行更多计算，导致</p>
<p>Generating more tokens requires more computation from the LLM, leading to higher energy 更高的能耗，可能响应时间更长，且成本更高。</p>
<p>consumption, potentially slower response times, and higher costs.</p>
<p>February 2025 8 2025年2月 8</p>
<p>Prompt Engineering Prompt Engineering</p>
<p>Reducing the output length of the LLM doesn’t cause the LLM to become more stylistically 减少大型语言模型（LLM）的输出长度并不会使其生成的内容在风格或文本上更加简洁，它</p>
<p>or textually succinct in the output it creates, it just causes the LLM to stop predicting more 只是导致模型在达到限制后停止预测更多的标记。如果你的需求需要较短的输出长度，你可能</p>
<p>tokens once the limit is reached. If your needs require a short output length, you’ll also 还需要设计你的提示以适应这一点。</p>
<p>possibly need to engineer your prompt to accommodate.</p>
<p>Output length restriction is especially important for some LLM prompting techniques, like 输出长度限制对于某些LLM提示技术尤为重要，比如ReAct，在这些技术中，LLM会在你</p>
<p>ReAct, where the LLM will keep emitting useless tokens after the response you want. 想要的响应之后继续生成无用的标记。</p>
<p>Be aware, generating more tokens requires more computation from the LLM, leading 请注意，生成更多的标记需要LLM进行更多计算，导致更高的能耗和可能更慢的响应</p>
<p>to higher energy consumption and potentially slower response times, which leads to 时间，从而带来更高的成本。</p>
<p>higher costs.</p>
<p>Sampling controls 采样控制</p>
<p>LLMs do not formally predict a single token. Rather, LLMs predict probabilities for what the 大型语言模型（LLM）并不正式预测单个标记。相反，LLM 会预测下一个标记可能是什么的</p>
<p>next token could be, with each token in the LLM’s vocabulary getting a probability. Those 概率，LLM 词汇表中的每个标记都会获得一个概率。然后根据这些标记概率进行采样，以确</p>
<p>token probabilities are then sampled to determine what the next produced token will be. 定下一个生成的标记。温度（Temperature）、top‑K 和 top‑P 是最常见的配置设置，用于</p>
<p>Temperature, top-K, and top-P are the most common configuration settings that determine 决定如何处理预测的标记概率以选择单个输出标记。</p>
<p>how predicted token probabilities are processed to choose a single output token.</p>
<p>Temperature</p>
<p>温度</p>
<p>Temperature controls the degree of randomness in token selection. Lower temperatures 温度控制标记选择的随机程度。较低的温度适用于期望更确定性响应的提示，而较高的温度则</p>
<p>are good for prompts that expect a more deterministic response, while higher temperatures 可能导致更丰富或意想不到的结果。温度为 0（贪婪解码）时是</p>
<p>can lead to more diverse or unexpected results. A temperature of 0 (greedy decoding) is</p>
<p>February 2025 9 2025年2月 9</p>`
    },
    {
      title: 'you may not always get the same output with temper',
      level: 1,
      content: `<p>Prompt Engineering Prompt Engineering</p>
<p>deterministic: the highest probability token is always selected (though note that if two tokens 确定性：始终选择最高概率的标记（但请注意，如果两个标记具有相同的最高预测概率，取决于</p>
<p>have the same highest predicted probability, depending on how tiebreaking is implemented 如何实现平局决胜，温度为0时您可能不会总是得到相同的输出）。</p>
<p>you may not always get the same output with temperature 0).</p>
<p>Temperatures close to the max tend to create more random output. And as temperature gets 接近最大值的温度往往会产生更随机的输出。随着温度越来越高，所有标记成为下一个预测标记</p>
<p>higher and higher, all tokens become equally likely to be the next predicted token. 的概率变得相等。</p>
<p>The Gemini temperature control can be understood in a similar way to the softmax function Gemini的温度控制可以类似于机器学习中使用的softmax函数来理解。较低的温度设置类似于</p>
<p>used in machine learning. A low temperature setting mirrors a low softmax temperature (T), 低softmax温度（T），强调单一的、确定性高的首选温度。较高的Gemini温度设置则像高</p>
<p>emphasizing a single, preferred temperature with high certainty. A higher Gemini temperature softmax温度，使得围绕所选设置的更广泛温度范围变得更可接受。这种增加的不确定性适用于</p>
<p>setting is like a high softmax temperature, making a wider range of temperatures around 那些不需要严格、精确温度的场景，例如在尝试创造性输出时。</p>
<p>the selected setting more acceptable. This increased uncertainty accommodates scenarios</p>
<p>where a rigid, precise temperature may not be essential like for example when experimenting</p>
<p>with creative outputs.</p>
<p>Top-K and top-P Top‑K 和 top‑P</p>
<p>Top-K and top-P (also known as nucleus sampling)4 are two sampling settings used in LLMs Top‑K 和 top‑P（也称为核采样）是大型语言模型中用于限制预测下一个词元仅从预测概率最</p>
<p>to restrict the predicted next token to come from tokens with the top predicted probabilities. 高的词元中选择的两种采样设置。与温度参数类似，这些采样设置控制生成文本的随机性和多样</p>
<p>Like temperature, these sampling settings control the randomness and diversity of 性。</p>
<p>generated text.</p>
<ul>
<li>Top-K sampling selects the top K most likely tokens from the model’s predicted • Top‑K 采样从模型预测的分布中选择概率最高的前 K 个词元。Top‑K 越高，模型输出越有</li>
</ul>
<p>distribution. The higher top-K, the more creative and varied the model’s output; the 创造性和多样性；Top‑K 越低，模型输出越保守和事实性。Top‑K 为 1 相当于贪婪解码。</p>
<p>lower top-K, the more restive and factual the model’s output. A top-K of 1 is equivalent to</p>
<p>greedy decoding.</p>
<p>February 2025 10 2025年2月 10</p>
<p>Prompt Engineering Prompt Engineering</p>
<ul>
<li>Top-P sampling selects the top tokens whose cumulative probability does not exceed • Top‑P采样选择累计概率不超过某个值（P）的最高概率词元。P的取值范围从0（贪</li>
</ul>
<p>a certain value (P). Values for P range from 0 (greedy decoding) to 1 (all tokens in the 婪解码）到1（LLM词汇表中的所有词元）。</p>
<p>LLM’s vocabulary).</p>
<p>The best way to choose between top-K and top-P is to experiment with both methods (or 在top‑K和top‑P之间选择的最佳方法是同时尝试这两种方法（或两者结合），看看哪种方</p>
<p>both together) and see which one produces the results you are looking for. 法能产生你想要的结果。</p>
<p>Putting it all together 综合应用</p>
<p>Choosing between top-K, top-P, temperature, and the number of tokens to generate, 在 top‑K、top‑P、温度和生成的令牌数量之间进行选择，取决于具体的应用和期望的结果，</p>
<p>depends on the specific application and desired outcome, and the settings all impact one 这些设置彼此都会相互影响。了解所选模型如何结合不同的采样设置也非常重要。</p>
<p>another. It’s also important to make sure you understand how your chosen model combines</p>
<p>the different sampling settings together.</p>
<p>If temperature, top-K, and top-P are all available (as in Vertex Studio), tokens that meet 如果温度、top‑K 和 top‑P 都可用（如在 Vertex Studio 中），满足 top‑K 和 top‑P 条件的令</p>
<p>both the top-K and top-P criteria are candidates for the next predicted token, and then 牌将成为下一个预测令牌的候选，然后应用温度从通过 top‑K 和 top‑P 条件的令牌中进行采样。</p>
<p>temperature is applied to sample from the tokens that passed the top-K and top-P criteria. If 如果只有 top‑K 或 top‑P 可用，行为相同，但只使用其中一个 top‑K 或 top‑P 设置。</p>
<p>only top-K or top-P is available, the behavior is the same but only the one top-K or P setting</p>
<p>is used.</p>
<p>If temperature is not available, whatever tokens meet the top-K and/or top-P criteria are then 如果温度不可用，则从满足 top‑K 和/或 top‑P 条件的令牌中随机选择，以生成单个下一个预测</p>
<p>randomly selected from to produce a single next predicted token. 令牌。</p>
<p>At extreme settings of one sampling configuration value, that one sampling setting either 在某个采样配置值的极端设置下，该采样设置要么抵消其他配置设置，要么变得无关紧要。</p>
<p>cancels out other configuration settings or becomes irrelevant.</p>
<p>February 2025 11 2025年2月 11</p>
<p>Prompt Engineering Prompt Engineering</p>
<ul>
<li>If you set temperature to 0, top-K and top-P become irrelevant–the most probable • 如果将温度设置为0，top‑K和top‑P将变得无关紧要——最可能的标记将成为下一个预</li>
</ul>
<p>token becomes the next token predicted. If you set temperature extremely high (above 测的标记。如果将温度设置得非常高（高于1——通常达到10以上），温度将变得无关紧要，</p>
<p>1–generally into the 10s), temperature becomes irrelevant and whatever tokens make 任何通过top‑K和/或top‑P标准的标记将被随机采样以选择下一个预测的标记。</p>
<p>it through the top-K and/or top-P criteria are then randomly sampled to choose a next</p>
<p>predicted token.</p>
<ul>
<li>If you set top-K to 1, temperature and top-P become irrelevant. Only one token passes the • 如果将top‑K设置为1，温度和top‑P将变得无关紧要。只有一个标记通过top‑K标准，该</li>
</ul>
<p>top-K criteria, and that token is the next predicted token. If you set top-K extremely high, 标记即为下一个预测的标记。如果将top‑K设置得非常高，比如达到大型语言模型词汇表的大</p>
<p>like to the size of the LLM’s vocabulary, any token with a nonzero probability of being the 小，任何具有非零概率成为下一个标记的标记都将满足top‑K标准，没有被筛选掉。</p>
<p>next token will meet the top-K criteria and none are selected out.</p>
<ul>
<li>If you set top-P to 0 (or a very small value), most LLM sampling implementations will then • 如果将top‑P设置为0（或非常小的值），大多数大型语言模型采样实现将只考虑最可能的</li>
</ul>
<p>only consider the most probable token to meet the top-P criteria, making temperature and 标记以满足top‑P标准，使温度和top‑K变得无关紧要。如果将top‑P设置为1，任何具有非零</p>
<p>top-K irrelevant. If you set top-P to 1, any token with a nonzero probability of being the 概率成为下一个标记的标记都将满足top‑P标准，没有被筛选掉。</p>
<p>next token will meet the top-P criteria, and none are selected out.</p>
<p>As a general starting point, a temperature of .2, top-P of .95, and top-K of 30 will give you 作为一个通用的起点，温度设为0.2，top‑P设为0.95，top‑K设为30，可以获得相对连贯且具</p>
<p>relatively coherent results that can be creative but not excessively so. If you want especially 有一定创造性的结果，但不会过于夸张。如果你想要特别有创造性的结果，可以尝试将温度设为</p>
<p>creative results, try starting with a temperature of .9, top-P of .99, and top-K of 40. And if you 0.9，top‑P设为0.99，top‑K设为40。如果你想要较少创造性的结果，可以尝试将温度设为</p>
<p>want less creative results, try starting with a temperature of .1, top-P of .9, and top-K of 20. 0.1，top‑P设为0.9，top‑K设为20。最后，如果你的任务总是有唯一正确答案（例如，解答数</p>
<p>Finally, if your task always has a single correct answer (e.g., answering a math problem), start 学问题），请将温度设为0。</p>
<p>with a temperature of 0.</p>
<p>NOTE: With more freedom (higher temperature, top-K, top-P, and output tokens), the LLM 注意：自由度越高（温度、top‑K、top‑P和输出标记越高），大型语言模型生成的文本可</p>
<p>might generate text that is less relevant. 能越不相关。</p>
<p>WARNING: Have you ever seen a response ending with a large amount of filler words? This 警告：你是否见过回答以大量填充词结尾的情况？这也被称为“重复循环错误”，这是大型</p>
<p>is also known as the &quot;repetition loop bug&quot;, which is a common issue in Large Language 语言模型中的一个常见问题，模型会陷入循环，反复生成相同的（填充）词、短语或句子结构，</p>
<p>Models where the model gets stuck in a cycle, repeatedly generating the same (filler) word, 通常由于温度和top‑k设置不当而加剧。</p>
<p>phrase, or sentence structure, often exacerbated by inappropriate temperature and top-k/</p>
<p>February 2025 12 2025年2月 12</p>`
    },
    {
      title: 'top-p settings. This can occur at both l',
      level: 1,
      content: `<p>Prompt Engineering Prompt Engineering</p>
<p>top-p settings. This can occur at both low and high temperature settings, though for different top‑p 设置。这种情况可能出现在低温和高温设置下，但原因不同。在低温时，模型变得过于确</p>
<p>reasons. At low temperatures, the model becomes overly deterministic, sticking rigidly to the 定性，严格遵循最高概率路径，如果该路径重复访问之前生成的文本，可能导致循环。相反，在</p>
<p>highest probability path, which can lead to a loop if that path revisits previously generated 高温时，模型的输出变得过于随机，增加了随机选择的单词或短语偶然回到先前状态的概率，由</p>
<p>text. Conversely, at high temperatures, the model&#x27;s output becomes excessively random, 于可选项众多，导致循环。在这两种情况下，模型的采样过程都会“卡住”，产生单调且无用</p>
<p>increasing the probability that a randomly chosen word or phrase will, by chance, lead back 的输出，直到输出窗口填满。解决这个问题通常需要仔细调整温度和 top‑k/top‑p 值，以找到确</p>
<p>to a prior state, creating a loop due to the vast number of available options. In both cases, 定性和随机性之间的最佳平衡。</p>
<p>the model&#x27;s sampling process gets &quot;stuck,&quot; resulting in monotonous and unhelpful output</p>
<p>until the output window is filled. Solving this often requires careful tinkering with temperature</p>
<p>and top-k/top-p values to find the optimal balance between determinism and randomness.</p>
<p>Prompting techniques 提示技巧</p>
<p>LLMs are tuned to follow instructions and are trained on large amounts of data so they can 大型语言模型（LLM）经过调优以遵循指令，并在大量数据上训练，因此它们能够理解提示并</p>
<p>understand a prompt and generate an answer. But LLMs aren’t perfect; the clearer your 生成答案。但大型语言模型并不完美；提示文本越清晰，模型预测下一个可能文本的效果越好。</p>
<p>prompt text, the better it is for the LLM to predict the next likely text. Additionally, specific 此外，利用大型语言模型的训练方式和工作原理的特定技巧，将帮助你从模型中获得相关的结果。</p>
<p>techniques that take advantage of how LLMs are trained and how LLMs work will help you get</p>
<p>the relevant results from LLMs</p>
<p>Now that we understand what prompt engineering is and what it takes, let’s dive into some 既然我们已经了解了什么是提示工程以及它的要求，让我们深入探讨一些最重要的提示技术示</p>
<p>examples of the most important prompting techniques. 例。</p>
<p>General prompting / zero shot 通用提示 / 零样本</p>
<p>A zero-shot5 prompt is the simplest type of prompt. It only provides a description of a task 零样本提示是最简单的提示类型。它只提供任务描述和一些文本供大型语言模型开始处理。</p>
<p>and some text for the LLM to get started with. This input could be anything: a question, a 这个输入可以是任何内容：一个问题、故事的开头或指令。零样本的名称意味着“无示例”。</p>
<p>start of a story, or instructions. The name zero-shot stands for ’no examples’.</p>
<p>February 2025 13 2025年2月 13</p>
<p>Prompt Engineering Prompt Engineering</p>
<p>Let’s use Vertex AI Studio (for Language) in Vertex AI,6 which provides a playground to test 让我们使用 Vertex AI 中的 Vertex AI Studio（语言部分），它提供了一个测试提示的游乐</p>
<p>prompts. In Table 1, you will see an example zero-shot prompt to classify movie reviews. 场。在表1中，您将看到一个用于分类电影评论的零样本提示示例。</p>
<p>The table format as used below is a great way of documenting prompts. Your prompts will 下面使用的表格格式是记录提示的绝佳方式。您的提示很可能会经过多次迭代，才会最终进入</p>
<p>likely go through many iterations before they end up in a codebase, so it’s important to keep 代码库，因此以有纪律、有结构的方式跟踪您的提示工程工作非常重要。本章后面“最佳实践”</p>
<p>track of your prompt engineering work in a disciplined, structured way. More on this table 部分（“记录各种提示尝试”）中，将详细介绍这种表格格式、跟踪提示工程工作的重要性</p>
<p>format, the importance of tracking prompt engineering work, and the prompt development 以及提示开发过程。</p>
<p>process is in the Best Practices section later in this chapter (“Document the various prompt</p>
<p>attempts”).</p>
<p>The model temperature should be set to a low number, since no creativity is needed, and we 模型温度应设置为较低的数值，因为不需要创造力，我们使用 gemini‑pro 默认的 top‑K 和</p>
<p>use the gemini-pro default top-K and top-P values, which effectively disable both settings top‑P 值，这实际上禁用了这两个设置（见上文“LLM 输出配置”）。请注意生成的输出。</p>
<p>(see ‘LLM Output Configuration’ above). Pay attention to the generated output. The words 单词 disturbing 和 masterpiece 应该会使预测稍微复杂一些，因为这两个词都出现在同一句</p>
<p>disturbing and masterpiece should make the prediction a little more complicated, as both 话中。</p>
<p>words are used in the same sentence.</p>
<p>February 2025 14 2025年2月 14</p>
<p>Prompt Engineering Prompt Engineering</p>
<p>Name 1_1_movie_classification Name 1_1_电影分类</p>
<p>Goal Classify movie reviews as positive, neutral or negative. Goal 将电影评论分类为正面、中性或负面。</p>
<p>Model gemini-pro 模型 gemini-pro</p>
<p>Temperature 0.1 Token Limit 5 温度 0.1 令牌限制 5</p>
<p>Top-K N/A Top-P 1 Top-K N/A Top-P 1</p>
<p>Prompt Classify movie reviews as POSITIVE, NEUTRAL or NEGATIVE. 提示词 Classify movie reviews as POSITIVE, NEUTRAL or NEGATIVE.</p>
<p>Review: &quot;Her&quot; is a disturbing study revealing the direction Review: &quot;Her&quot; is a disturbing study revealing the direction</p>
<p>humanity is headed if AI is allowed to keep evolving, humanity is headed if AI is allowed to keep evolving,</p>
<p>unchecked. I wish there were more movies like this masterpiece. unchecked. I wish there were more movies like this masterpiece.</p>
<p>Sentiment: Sentiment:</p>
<p>Output POSITIVE 输出 积极</p>
<p>Table 1. An example of zero-shot prompting 表1. 零样本提示的示例</p>
<p>When zero-shot doesn’t work, you can provide demonstrations or examples in the prompt, 当零样本方法不起作用时，你可以在提示中提供演示或示例，这就形成了“一次示例”和</p>
<p>which leads to “one-shot” and “few-shot” prompting. General prompting / zero shot “少量示例”提示。通用提示 / 零样本</p>
<p>One-shot &amp; few-shot 一次示例与少量示例</p>
<p>When creating prompts for AI models, it is helpful to provide examples. These examples can 在为AI模型创建提示时，提供示例是有帮助的。这些示例可以帮助模型理解你的需求。当你想</p>
<p>help the model understand what you are asking for. Examples are especially useful when you 引导模型生成特定的输出结构或模式时，示例尤其有用。</p>
<p>want to steer the model to a certain output structure or pattern.</p>
<p>A one-shot prompt, provides a single example, hence the name one-shot. The idea is the 一次示例提示提供一个单一的示例，因此得名一次示例。其理念是模型有一个示例可以模仿，</p>
<p>model has an example it can imitate to best complete the task. 从而更好地完成任务。</p>
<p>A few-shot prompt 7 provides multiple examples to the model. This approach shows the 少量示例提示向模型提供多个示例。这种方法向模型展示了它需要遵循的模式。理念与一次示</p>
<p>model a pattern that it needs to follow. The idea is similar to one-shot, but multiple examples 例类似，但多个期望模式的示例增加了模型遵循该模式的可能性。</p>
<p>of the desired pattern increases the chance the model follows the pattern.</p>
<p>February 2025 15 2025年2月 15</p>`
    }
  ]
};

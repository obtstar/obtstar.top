// 报告: prompt-engineering-v7 - 第4块
// 页数: 61-68

window.REPORT_CHUNK_prompt_engineering_v7_4 = {
  reportId: "prompt-engineering-v7",
  chunkIndex: 4,
  pageRange: "61-68",
  sections: [
    {
      title: '• Less chance for hallucinations • Less 机会 for 幻觉',
      level: 1,
      content: `<p>Prompt Engineering Prompt Engineering</p>
<ul>
<li>Less chance for hallucinations • Less 机会 for 幻觉</li>
<li>Make it relationship aware • 使其具有关联感知</li>
<li>You get data types • 你获得数据类型</li>
<li>You can sort it • 你可以对其进行排序</li>
</ul>
<p>Table 4 in the few-shot prompting section shows an example on how to return 少样本提示部分的表4展示了如何返回结构化输出的示例。</p>
<p>structured output.</p>
<p>JSON Repair JSON 修复</p>
<p>While returning data in JSON format offers numerous advantages, it&#x27;s not without its 虽然以 JSON 格式返回数据有诸多优势，但也存在一些缺点。JSON 的结构化特性虽然有利于</p>
<p>drawbacks. The structured nature of JSON, while beneficial for parsing and use in 解析和应用使用，但相比纯文本需要更多的令牌，导致处理时间增加和成本上升。此外，</p>
<p>applications, requires significantly more tokens than plain text, leading to increased JSON 的冗长性很容易占满整个输出窗口，尤其在生成因令牌限制被突然截断时更为严重。这</p>
<p>processing time and higher costs. Furthermore, JSON&#x27;s verbosity can easily consume the 种截断常常导致无效的 JSON，缺少关键的闭合大括号或方括号，使输出无法使用。幸运的是，</p>
<p>entire output window, becoming especially problematic when the generation is abruptly cut 像 json-repair 库（可在 PyPI 上获取）这样的工具在这些情况下非常有用。该库能够智能</p>
<p>off due to token limits. This truncation often results in invalid JSON, missing crucial closing 地尝试自动修复不完整或格式错误的 JSON 对象，是处理 LLM 生成的 JSON 时，尤其是面对</p>
<p>braces or brackets, rendering the output unusable. Fortunately, tools like the json-repair</p>
<p>潜在截断问题时的重要助手。</p>
<p>library (available on PyPI) can be invaluable in these situations. This library intelligently</p>
<p>attempts to automatically fix incomplete or malformed JSON objects, making it a crucial</p>
<p>ally when working with LLM-generated JSON, especially when dealing with potential</p>
<p>truncation issues.</p>
<p>February 2025 61 2025年2月 61</p>
<p>Prompt Engineering Prompt Engineering</p>
<p>Working with Schemas Working with Schemas</p>
<p>Using structured JSON as an output is a great solution, as we&#x27;ve seen multiple times in this 使用结构化的 JSON 作为输出是一个很好的解决方案，正如我们在本文中多次看到的那样。但输</p>
<p>paper. But what about input? While JSON is excellent for structuring the output the LLM 入呢？虽然 JSON 非常适合结构化 LLM 生成的输出，它同样也非常适合结构化你提供的输入。</p>
<p>generates, it can also be incredibly useful for structuring the input you provide. This is where 这就是 JSON Schema 发挥作用的地方。JSON Schema 定义了你 JSON 输入的预期结构和数</p>
<p>JSON Schemas come into play. A JSON Schema defines the expected structure and data 据类型。通过提供一个 schema，你为 LLM 提供了一个清晰的数据蓝图，帮助它将注意力集中</p>
<p>types of your JSON input. By providing a schema, you give the LLM a clear blueprint of the 在相关信息上，减少误解输入的风险。此外，schema 还能帮助建立不同数据之间的关系，甚至</p>
<p>data it should expect, helping it focus its attention on the relevant information and reducing 通过包含特定格式的日期或时间戳字段，使 LLM 具备“时间感知”能力。</p>
<p>the risk of misinterpreting the input. Furthermore, schemas can help establish relationships</p>
<p>between different pieces of data and even make the LLM &quot;time-aware&quot; by including date or</p>
<p>timestamp fields with specific formats.</p>
<p>Here&#x27;s a simple example: 这里有一个简单的例子：</p>
<p>Let&#x27;s say you want to use an LLM to generate descriptions for products in an e-commerce 假设你想用 LLM 为电商目录中的产品生成描述。你可以不用仅仅提供产品的自由文本描述，</p>
<p>catalog. Instead of just providing a free-form text description of the product, you can use a 而是使用 JSON schema 来定义产品的属性：</p>
<p>JSON schema to define the product&#x27;s attributes:</p>
<p>{ {</p>
<p>&quot;type&quot;: &quot;object&quot;, &quot;type&quot;: &quot;object&quot;,</p>
<p>&quot;properties&quot;: { &quot;properties&quot;: {</p>
<p>&quot;name&quot;: { &quot;type&quot;: &quot;string&quot;, &quot;description&quot;: &quot;Product name&quot; }, &quot;name&quot;: { &quot;type&quot;: &quot;string&quot;, &quot;description&quot;: &quot;Product name&quot; },</p>
<p>&quot;category&quot;: { &quot;type&quot;: &quot;string&quot;, &quot;description&quot;: &quot;Product category&quot; }, &quot;category&quot;: { &quot;type&quot;: &quot;string&quot;, &quot;description&quot;: &quot;Product category&quot; },</p>
<p>&quot;price&quot;: { &quot;type&quot;: &quot;number&quot;, &quot;format&quot;: &quot;float&quot;, &quot;description&quot;: &quot;Product &quot;price&quot;: { &quot;type&quot;: &quot;number&quot;, &quot;format&quot;: &quot;float&quot;, &quot;description&quot;: &quot;Product</p>
<p>price&quot; }, price&quot; },</p>
<p>&quot;features&quot;: { &quot;features&quot;: {</p>
<p>&quot;type&quot;: &quot;array&quot;, &quot;type&quot;: &quot;array&quot;,</p>
<p>&quot;items&quot;: { &quot;type&quot;: &quot;string&quot; }, &quot;items&quot;: { &quot;type&quot;: &quot;string&quot; },</p>
<p>&quot;description&quot;: &quot;Key features of the product&quot; &quot;description&quot;: &quot;Key features of the product&quot;</p>
<p>}, },</p>
<p>&quot;release_date&quot;: { &quot;type&quot;: &quot;string&quot;, &quot;format&quot;: &quot;date&quot;, &quot;description&quot;: &quot;release_date&quot;: { &quot;type&quot;: &quot;string&quot;, &quot;format&quot;: &quot;date&quot;, &quot;description&quot;:</p>
<p>&quot;Date the product was released&quot;} &quot;Date the product was released&quot;}</p>
<p>}, },</p>
<p>Snippet 5. Definition of the structured output schema 代码片段 5. 结构化输出 schema 的定义</p>
<p>February 2025 62 2025年2月 62</p>
<p>Prompt Engineering Prompt Engineering</p>
<p>Then, you can provide the actual product data as a JSON object that conforms to 然后，您可以提供符合此模式的实际产品数据作为 JSON 对象：</p>
<p>this schema:</p>
<p>{ {</p>
<p>&quot;name&quot;: &quot;Wireless Headphones&quot;, &quot;name&quot;: &quot;Wireless Headphones&quot;,</p>
<p>&quot;category&quot;: &quot;Electronics&quot;, &quot;category&quot;: &quot;Electronics&quot;,</p>
<p>&quot;price&quot;: 99.99, &quot;price&quot;: 99.99,</p>
<p>&quot;features&quot;: [&quot;Noise cancellation&quot;, &quot;Bluetooth 5.0&quot;, &quot;20-hour battery life&quot;], &quot;features&quot;: [&quot;Noise cancellation&quot;, &quot;Bluetooth 5.0&quot;, &quot;20-hour battery life&quot;],</p>
<p>&quot;release_date&quot;: &quot;2023-10-27&quot; &quot;release_date&quot;: &quot;2023-10-27&quot;</p>
<p>} }</p>
<p>Snippet 6. Structured output from the LLM 代码片段6. 来自大型语言模型的结构化输出</p>
<p>By preprocessing your data and instead of providing full documents only providing both the 通过预处理您的数据，而不是提供完整文档，仅提供模式和数据，您为大型语言模型清晰地展示</p>
<p>schema and the data, you give the LLM a clear understanding of the product&#x27;s attributes, 了产品的属性，包括其发布日期，这大大提高了生成准确且相关描述的可能性。这种结构化输入</p>
<p>including its release date, making it much more likely to generate an accurate and relevant 方法，引导大型语言模型关注相关字段，在处理大量数据或将大型语言模型集成到复杂应用中时</p>
<p>description. This structured input approach, guiding the LLM&#x27;s attention to the relevant fields, 尤其有价值。</p>
<p>is especially valuable when working with large volumes of data or when integrating LLMs into</p>
<p>complex applications.</p>
<p>Experiment together with other prompt engineers 与其他提示工程师一起实验</p>
<p>If you are in a situation where you have to try to come up with a good prompt, you might 如果你必须尝试想出一个好的提示，可能需要找多个人一起尝试。当每个人都遵循本章列出的</p>
<p>want to find multiple people to make an attempt. When everyone follows the best practices 最佳实践时，你会看到不同提示尝试之间的性能差异。</p>
<p>(as listed in this chapter) you are going to see a variance in performance between all the</p>
<p>different prompt attempts.</p>
<p>February 2025 63 2025年2月 63</p>`
    },
    {
      title: 'CoT Best practices 链式思维最佳实践',
      level: 1,
      content: `<p>Prompt Engineering Prompt Engineering</p>
<p>CoT Best practices 链式思维最佳实践</p>
<p>For CoT prompting, putting the answer after the reasoning is required because the 对于链式思维提示，必须将答案放在推理之后，因为推理的生成会改变模型在预测最终答案</p>
<p>generation of the reasoning changes the tokens that the model gets when it predicts the 时接收到的标记。</p>
<p>final answer.</p>
<p>With CoT and self-consistency you need to be able to extract the final answer from your 使用链式思维和自洽性时，您需要能够从提示中提取最终答案，并将其与推理部分分开。</p>
<p>prompt, separated from the reasoning.</p>
<p>For CoT prompting, set the temperature to 0. 对于CoT提示，将温度设置为0。</p>
<p>Chain of thought prompting is based on greedy decoding, predicting the next word in a 链式思维提示基于贪婪解码，根据语言模型分配的最高概率预测序列中的下一个词。一般来</p>
<p>sequence based on the highest probability assigned by the language model. Generally 说，在使用推理来得出最终答案时，通常只有一个正确答案。因此温度应始终设置为0。</p>
<p>speaking, when using reasoning, to come up with the final answer, there’s likely one single</p>
<p>correct answer. Therefore the temperature should always set to 0.</p>
<p>Document the various prompt attempts 记录各种提示尝试</p>
<p>The last tip was mentioned before in this chapter, but we can’t stress enough how important 上一条提示在本章中已提及，但我们必须再次强调其重要性：详细记录你的提示尝试，这样你</p>
<p>it is: document your prompt attempts in full detail so you can learn over time what went well 才能随着时间的推移了解哪些有效，哪些无效。</p>
<p>and what did not.</p>
<p>Prompt outputs can differ across models, across sampling settings, and even across different 提示输出在不同模型、不同采样设置，甚至同一模型的不同版本之间可能有所不同。此外，即使</p>
<p>versions of the same model. Moreover, even across identical prompts to the same model, 是对同一模型的相同提示，输出句子的格式和用词也可能存在细微差异。（例如，如前所述，如</p>
<p>small differences in output sentence formatting and word choice can occur. (For example, as 果两个词元具有相同的预测概率，平局可能会随机打破。这会影响后续预测的词元。）</p>
<p>mentioned previously, if two tokens have the same predicted probability, ties may be broken</p>
<p>randomly. This can then impact subsequent predicted tokens.).</p>
<p>February 2025 64 2025年2月 64</p>
<p>Prompt Engineering Prompt Engineering</p>
<p>We recommend creating a Google Sheet with Table 21 as a template. The advantages of 我们建议创建一个以表21为模板的Google表格。这种方法的优点是，当你不可避免地需要重</p>
<p>this approach are that you have a complete record when you inevitably have to revisit your 新审视你的提示工作时，你会有完整的记录——无论是为了将来继续使用（你会惊讶于短暂休</p>
<p>prompting work–either to pick it up in the future (you’d be surprised how much you can 息后能忘记多少内容）、测试不同模型版本上的提示性能，还是帮助调试未来的错误。</p>
<p>forget after just a short break), to test prompt performance on different versions of a model,</p>
<p>and to help debug future errors.</p>
<p>Beyond the fields in this table, it’s also helpful to track the version of the prompt (iteration), 除了表中的字段外，跟踪提示的版本（迭代）、记录结果是否为OK/不OK/有时OK的字段以</p>
<p>a field to capture if the result was OK/NOT OK/SOMETIMES OK, and a field to capture 及反馈字段也很有帮助。如果你有幸使用Vertex AI Studio，请保存你的提示（使用与你文档</p>
<p>feedback. If you’re lucky enough to be using Vertex AI Studio, save your prompts (using the 中列出的相同名称和版本），并在表中跟踪保存提示的超链接。这样，你总能一键重新运行你的</p>
<p>same name and version as listed in your documentation) and track the hyperlink to the saved 提示。</p>
<p>prompt in the table. This way, you’re always one click away from re-running your prompts.</p>
<p>When working on a retrieval augmented generation system, you should also capture the 在构建检索增强生成系统时，你还应记录影响插入提示内容的RAG系统的具体方面，包括查</p>
<p>specific aspects of the RAG system that impact what content was inserted into the prompt, 询、分块设置、分块输出及其他信息。</p>
<p>including the query, chunk settings, chunk output, and other information.</p>
<p>Once you feel the prompt is close to perfect, take it to your project codebase. And in the 一旦你觉得提示接近完美，就将其应用到你的项目代码库中。在代码库中，将提示保存在与代码</p>
<p>codebase, save prompts in a separate file from code, so it’s easier to maintain. Finally, ideally 分开的文件中，这样更容易维护。最后，理想情况下，你的提示是操作化系统的一部分，作为提</p>
<p>your prompts are part of an operationalized system, and as a prompt engineer you should 示工程师，你应依赖自动化测试和评估程序来了解你的提示在任务中的泛化能力。</p>
<p>rely on automated tests and evaluation procedures to understand how well your prompt</p>
<p>generalizes to a task.</p>
<p>Prompt engineering is an iterative process. Craft and test different prompts, analyze, 提示工程是一个迭代过程。设计并测试不同的提示，分析并记录结果。根据模型的表现优化</p>
<p>and document the results. Refine your prompt based on the model’s performance. Keep 你的提示。不断实验，直到达到期望的输出。当你更换模型或模型配置时，回过头继续对之</p>
<p>experimenting until you achieve the desired output. When you change a model or model 前使用的提示进行实验。</p>
<p>configuration, go back and keep experimenting with the previously used prompts.</p>
<p>February 2025 65 2025年2月 65</p>
<p>Prompt Engineering Prompt Engineering</p>
<p>Name [name and version of your prompt] Name [您的提示名称和版本]</p>
<p>Goal [One sentence explanation of the goal of this attempt] Goal [本次尝试目标的一句话说明]</p>
<p>Model [name and version of the used model] 模型 [所用模型的名称和版本]</p>
<p>Temperature [value between 0 - 1] Token Limit [number] 温度 [数值范围在0 ‑ 1]之间 令牌限制 [数字]</p>
<p>Top-K [number] Top-P [number] Top-K [数字] Top-P [数字]</p>
<p>Prompt [Write all the full prompt] 提示 [Write all the full prompt]</p>
<p>Output [Write out the output or multiple outputs] 输出 [写出输出或多个输出]</p>
<p>Table 21. A template for documenting prompts 表21. 提示文档模板</p>
<p>Summary</p>
<p>总结</p>
<p>This whitepaper discusses prompt engineering. We learned various prompting techniques, 本白皮书讨论了提示工程。我们学习了各种提示技术，例如：</p>
<p>such as:</p>
<ul>
<li>Zero prompting • 零样本提示</li>
<li>Few shot prompting • 少样本提示</li>
<li>System prompting • 系统提示</li>
<li>Role prompting • 角色提示</li>
<li>Contextual prompting • 上下文提示</li>
<li>Step-back prompting • 回退提示</li>
<li>Chain of thought • 思维链</li>
<li>Self consistency • 自洽性</li>
<li>Tree of thoughts • 思维树</li>
</ul>
<p>February 2025 66 2025年2月 66</p>`
    },
    {
      title: 'prompt engineer.',
      level: 1,
      content: `<p>Prompt Engineering Prompt Engineering</p>
<ul>
<li>ReAct • ReAct</li>
</ul>
<p>We even looked into ways how you can automate your prompts. 我们甚至研究了如何自动化你的提示 .</p>
<p>The whitepaper then discusses the challenges of gen AI like the problems that can happen 白皮书随后讨论了生成式人工智能的挑战，比如当你的提示不充分时可能出现的问题。我们最后</p>
<p>when your prompts are insufficient. We closed with best practices on how to become a better 总结了如何成为更优秀的提示工程师的最佳实践。</p>
<p>prompt engineer.</p>
<p>February 2025 67 2025年2月 67</p>
<p>Prompt Engineering 提示工程</p>
<p>Endnotes</p>
<p>尾注</p>
<ul>
<li>1. Google, 2023, Gemini by Google. Available at: https://gemini.google.com. 1. 谷歌，2023年，谷歌的Gemini。可访问：https://gemini.google.com。</li>
<li>2. Google, 2024, Gemini for Google Workspace Prompt Guide. Available at: 2. 谷歌，2024年，Google Workspace Gemini提示指南。可访问：</li>
</ul>
<p>https://inthecloud.withgoogle.com/gemini-for-google-workspace-prompt-guide/dl-cd.html. https://inthecloud.withgoogle.com/gemini‑for‑google‑workspace‑prompt‑guide/dl‑cd.html。</p>
<ul>
<li>3. Google Cloud, 2023, Introduction to Prompting. Available at: 3. Google Cloud，2023，提示介绍。可访问：</li>
</ul>
<p>https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/introduction-prompt-design. https://cloud.google.com/vertex‑ai/generative‑ai/docs/learn/prompts/introduction‑prompt‑design。</p>
<ul>
<li>4. Google Cloud, 2023, Text Model Request Body: Top-P &amp; top-K sampling methods. Available at: 4. Google Cloud，2023，文本模型请求体：Top‑P 和 top‑K 采样方法。可访问：</li>
</ul>
<p>https://cloud.google.com/vertex-ai/docs/generative-ai/model-reference/text#request_body. https://cloud.google.com/vertex‑ai/docs/generative‑ai/model‑reference/text#request_body。</p>
<ul>
<li>5. Wei, J., et al., 2023, Zero Shot - Fine Tuned language models are zero shot learners. Available at: 5. Wei, J. 等，2023，零样本 ‑ 微调语言模型是零样本学习者。可访问：</li>
</ul>
<p>https://arxiv.org/pdf/2109.01652.pdf. https://arxiv.org/pdf/2109.01652.pdf。</p>
<ul>
<li>6. Google Cloud, 2023, Google Cloud Model Garden. Available at: https://cloud.google.com/model-garden. 6. Google Cloud，2023，Google Cloud 模型花园。可访问：https://cloud.google.com/model‑garden。</li>
<li>7. Brown, T., et al., 2023, Few Shot - Language Models are Few Shot learners. Available at: 7. Brown, T. 等，2023，少样本 ‑ 语言模型是少样本学习者。可访问：</li>
</ul>
<p>https://arxiv.org/pdf/2005.14165.pdf. https://arxiv.org/pdf/2005.14165.pdf。</p>
<ul>
<li>8. Zheng, L., et al., 2023, Take a Step Back: Evoking Reasoning via Abstraction in Large Language Models. 8. Zheng, L. 等，2023，退一步：通过抽象在大型语言模型中激发推理。可访问：</li>
</ul>
<p>Available at: https://openreview.net/pdf?id=3bq3jsvcQ1 https://openreview.net/pdf?id=3bq3jsvcQ1</p>
<ul>
<li>9. Wei, J., et al., 2023, Chain of Thought Prompting. Available at: https://arxiv.org/pdf/2201.11903.pdf. 9. Wei, J., et al., 2023, Chain of Thought Prompting. Available at: https://arxiv.org/pdf/2201.11903.pdf.</li>
<li>10. Google Cloud Platform, 2023, Chain of Thought and React. Available at: https://github.com/ 10. 谷歌云平台，2023年，思维链与反应。可在以下网址获取：</li>
</ul>
<p>https://github.com/GoogleCloudPlatform/generative‑ai/blob/main/language/prompts/examples/chain_of_thought_react.ipynb。</p>
<p>GoogleCloudPlatform/generative-ai/blob/main/language/prompts/examples/chain_of_thought_react.ipynb.</p>
<ul>
<li>11. Wang, X., et al., 2023, Self Consistency Improves Chain of Thought reasoning in language models. 11. 王晓等，2023年，自洽性提升语言模型中的思维链推理。可在以下网址获取：</li>
</ul>
<p>Available at: https://arxiv.org/pdf/2203.11171.pdf. https://arxiv.org/pdf/2203.11171.pdf。</p>
<ul>
<li>12. Yao, S., et al., 2023, Tree of Thoughts: Deliberate Problem Solving with Large Language Models. 12. 姚森等，2023年，思维树：利用大型语言模型进行深思熟虑的问题解决。可在以下网址获取：</li>
</ul>
<p>Available at: https://arxiv.org/pdf/2305.10601.pdf. https://arxiv.org/pdf/2305.10601.pdf。</p>
<ul>
<li>13. Yao, S., et al., 2023, ReAct: Synergizing Reasoning and Acting in Language Models. Available at: 13. 姚森等，2023年，ReAct：在语言模型中协同推理与行动。可在以下网址获取：</li>
</ul>
<p>https://arxiv.org/pdf/2210.03629.pdf. https://arxiv.org/pdf/2210.03629.pdf。</p>
<ul>
<li>14. Google Cloud Platform, 2023, Advance Prompting: Chain of Thought and React. Available at: 14. 谷歌云平台，2023年，高级提示：思维链与反应。可在以下网址获取：</li>
</ul>
<p>https://github.com/GoogleCloudPlatform/applied‑ai‑engineering‑samples/blob/main/genai‑on‑vertex‑ai/advanced_prompting_training/cot_react.ipynb。</p>
<p>https://github.com/GoogleCloudPlatform/applied-ai-engineering-samples/blob/main/genai-</p>
<p>on-vertex-ai/advanced_prompting_training/cot_react.ipynb.</p>
<ul>
<li>15. Zhou, C., et al., 2023, Automatic Prompt Engineering - Large Language Models are Human-Level Prompt 15. 周成等，2023年，自动提示工程——大型语言模型是具有人类水平的提示工程师。可在以下网址获取：</li>
</ul>
<p>Engineers. Available at: https://arxiv.org/pdf/2211.01910.pdf. https://arxiv.org/pdf/2211.01910.pdf。</p>
<p>February 2025 68 2025年2月 68</p>`
    }
  ]
};

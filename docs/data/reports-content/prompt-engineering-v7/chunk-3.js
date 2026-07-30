// 报告: prompt-engineering-v7 - 第3块
// 页数: 46-60

window.REPORT_CHUNK_prompt_engineering_v7_3 = {
  reportId: "prompt-engineering-v7",
  chunkIndex: 3,
  pageRange: "46-60",
  sections: [
    {
      title: 'Output 3. **File Listing**: 输出 3. **文件列表**：',
      level: 1,
      content: `<p>Prompt Engineering Prompt Engineering</p>
<p>Output 3. **File Listing**: 输出 3. **文件列表**：</p>
<ul>
<li>It lists all the files inside the specified folder using the \`files=( “$folder_ ‑ 它使用 \`files= 列出指定文件夹内的所有文件（“$folder_</li>
</ul>
<p>name”/* )\` command. This creates an array called \`files\` containing the paths name”/* )\` 命令。 这会创建一个名为 \`files\` 的数组，包含路径</p>
<p>to all the files in the folder. 指向文件夹中的所有文件。</p>
<h3>4. **File Renaming**: 4. **文件重命名**：</h3>
<ul>
<li>It iterates through each file in the \`files\` array using a \`for\` loop. ‑ 它使用 \`for\` 循环遍历 \`files\` 数组中的每个文件。</li>
<li>For each file, it generates a new file name using the \`new_file_ ‑ 对于每个文件，它使用 \`new_file_ 生成一个新的文件名</li>
</ul>
<p>name=”draft_$(basename “$file”)” \` command. This new file name is created name=”draft_$(basename “$file”)” \` 命令。 这个新文件名被创建</p>
<p>by prefixing the original file name with the string “draft_”. 通过在原始文件名前加上字符串“draft_”。</p>
<ul>
<li>It then renames the file using the \`mv “$file” “$new_file_name”\` command, ‑ 然后使用 \`mv “$file” “$new_file_name”\` 命令重命名文件，</li>
</ul>
<p>which moves the file to the new file name. 该命令将文件移动到新的文件名。</p>
<h3>5. **Success Message**: 5. **成功消息**：</h3>
<ul>
<li>After renaming all the files, it displays a success message (“Files renamed ‑ 重命名所有文件后，显示成功消息（“文件重命名成功”</li>
</ul>
<p>successfully.”) to indicate that the renaming operation was successful ）以表示重命名操作成功</p>
<p>Table 17. A prompt for explaining code 表17. 解释代码的提示</p>
<p>Prompts for translating code 代码翻译提示</p>
<p>The bash code from Table 16 seems to work fine. However this script could really be reusable 表16中的bash代码似乎运行良好。然而，当该脚本能够提示我输入文件名时，它将真正具有</p>
<p>when it would prompt me for file names, ideally it should work as a separate application with 可重用性，理想情况下它应该作为一个带有用户界面的独立应用程序运行。作为起点，Python</p>
<p>an UI. As a starting point, Python would be a better language for a (web) application than 比Bash更适合用于（网页）应用程序。大型语言模型（LLM）可以帮助将代码从一种语言翻</p>
<p>Bash. LLMs can help with translating code from one language to another. See the example in 译成另一种语言。见表18中的示例：</p>
<p>Table 18:</p>
<p>February 2025 46 2025年2月 46</p>
<p>Prompt Engineering Prompt Engineering</p>
<p>Name 1_python_rename_files Name 1_python_重命名文件</p>
<p>Goal Write a prompt to translate Bash code to Python Goal 编写一个提示，将 Bash 代码翻译成 Python</p>
<p>Model gemini-pro 模型 gemini-pro</p>
<p>Temperature 0.1 Token Limit 1024 温度 0.1 令牌限制 1024</p>
<p>Top-K N/A Top-P 1 Top-K N/A Top-P 1</p>
<p>Prompt Translate the below Bash code to a Python snippet. 提示 Translate the below Bash code to a Python snippet.</p>
<p>\`\`\`bash \`\`\`bash</p>
<p>#!/bin/bash #!/bin/bash</p>
<p>echo &quot;Enter the folder name: &quot; echo &quot;Enter the folder name: &quot;</p>
<p>read folder_name read folder_name</p>
<p>if [ ! -d &quot;$folder_name&quot; ]; then if [ ! -d &quot;$folder_name&quot; ]; then</p>
<p>echo &quot;Folder does not exist.&quot; echo &quot;Folder does not exist.&quot;</p>
<p>exit 1 exit 1</p>
<p>fi fi</p>
<p>files=( &quot;$folder_name&quot;/* ) files=( &quot;$folder_name&quot;/* )</p>
<p>for file in &quot;\${files[@]}&quot;; do for file in &quot;\${files[@]}&quot;; do</p>
<p>new_file_name=&quot;draft_$(basename &quot;$file&quot;)&quot; new_file_name=&quot;draft_$(basename &quot;$file&quot;)&quot;</p>
<p>mv &quot;$file&quot; &quot;$new_file_name&quot; mv &quot;$file&quot; &quot;$new_file_name&quot;</p>
<p>done done</p>
<p>echo &quot;Files renamed successfully.&quot; echo &quot;Files renamed successfully.&quot;</p>
<p>\`\`\` \`\`\`</p>
<p>Output \`\`\`python 输出 \`\`\` python</p>
<p>import os import os</p>
<p>import shutil import shutil</p>
<p># Get the folder name from the user # Get the folder name from the user</p>
<p>folder_name = input(&quot;Enter the folder name: &quot;) folder_name = input(&quot;Enter the folder name: &quot;)</p>
<p># Check if the folder exists # Check if the folder exists</p>
<p>if not os.path.isdir(folder_name): if not os.path.isdir(folder_name):</p>
<p>print(&quot;Folder does not exist.&quot;) print(&quot;Folder does not exist.&quot;)</p>
<p>exit(1) exit(1)</p>
<p>Continues next page... Continues next page...</p>
<p>February 2025 47 2025年2月 47</p>
<p>Prompt Engineering Prompt Engineering</p>
<p>Output # Get a list of all files in the folder 输出 # Get a list of all files in the folder</p>
<p>files = os.listdir(folder_name) files = os.listdir(folder_name)</p>
<p># Iterate over the files # Iterate over the files</p>
<p>for file in files: for file in files:</p>
<p># Create a new file name with the prefix &quot;draft_&quot; # Create a new file name with the prefix &quot;draft_&quot;</p>
<p>new_file_name = f&quot;draft_{file}&quot; new_file_name = f&quot;draft_{file}&quot;</p>
<p># Move the file to the new name # Move the file to the new name</p>
<p>shutil.move(os.path.join(folder_name, file), shutil.move(os.path.join(folder_name, file),</p>
<p>os.path.join(folder_name, new_file_name)) os.path.join(folder_name, new_file_name))</p>
<p># Print a success message # Print a success message</p>
<p>print(&quot;Files renamed successfully.&quot;) print(&quot;Files renamed successfully.&quot;)</p>
<p>\`\`\` \`\`\`</p>
<p>Table 18. A prompt for translating code from Bash to Python 表18. 将代码从Bash翻译为Python的提示</p>
<p>Read and review the code. Copy the output from the prompt and paste it into a new file: 阅读并审查代码。将提示中的输出复制并粘贴到一个新文件中：file_renamer.py。通过打</p>
<p>file_renamer.py. Test the code by opening a Terminal window, and execute the following 开终端窗口并执行以下命令 python file_renamer.py 来测试代码。</p>
<p>command python file_renamer.py.</p>
<p>NOTE: When prompting for (Python) code in the Language Studio in Vertex AI, you will have 注意：在Vertex AI的Language Studio中提示（Python）代码时，您需要点击“</p>
<p>to click on the ‘Markdown’ button. Otherwise you will receive plain text which is missing the Markdown”按钮。否则，您将收到缺少正确缩进的纯文本，而正确的缩进对于运行</p>
<p>proper indenting of lines, which is important for running Python code. Python代码非常重要。</p>
<p>Prompts for debugging and reviewing code 用于调试和审查代码的提示</p>
<p>Let’s manually write some edits to the code of Table 18. It should prompt the user for the 让我们手动编写一些对表18代码的修改。它应该提示用户输入文件名前缀，并将该前缀以</p>
<p>filename prefix, and write this prefix in upper case characters. See the example code in 大写字母形式写出。参见代码片段*3中的示例代码，但真糟糕。现在它返回了Python错</p>
<p>Snippet *3, but what a bummer. It now returns Python errors! 误！</p>
<p>February 2025 48 2025年2月 48</p>`
    },
    {
      title: 'Python Python',
      level: 1,
      content: `<p>Prompt Engineering Prompt Engineering</p>
<p>Python Python</p>
<p>import os import os</p>
<p>import shutil import shutil</p>
<p>folder_name = input(&quot;Enter the folder name: &quot;) folder_name = input(&quot;Enter the folder name: &quot;)</p>
<p>prefix = input(&quot;Enter the string to prepend to the filename: &quot;) prefix = input(&quot;Enter the string to prepend to the filename: &quot;)</p>
<p>text = toUpperCase(prefix) text = toUpperCase(prefix)</p>
<p>if not os.path.isdir(folder_name): if not os.path.isdir(folder_name):</p>
<p>print(&quot;Folder does not exist.&quot;) print(&quot;Folder does not exist.&quot;)</p>
<p>exit(1) exit(1)</p>
<p>files = os.listdir(folder_name) files = os.listdir(folder_name)</p>
<p>for file in files: for file in files:</p>
<p>new_filename = f&quot;{text}_{file}&quot; new_filename = f&quot;{text}_{file}&quot;</p>
<p>shutil.move(os.path.join(folder_name, file), shutil.move(os.path.join(folder_name, file),</p>
<p>os.path.joi(folder_name, new_file_name)) os.path.joi(folder_name, new_file_name))</p>
<p>print(&quot;Files renamed successfully.&quot;) print(&quot;Files renamed successfully.&quot;)</p>
<p>Snippet 3. A broken Python script Snippet 3. A broken Python script</p>
<p>Doh! That looks like a bug: 哎呀！这看起来像是个错误：</p>
<p>The below Python code gives an error: The below Python code gives an error:</p>
<p>Traceback (most recent call last): Traceback (most recent call last):</p>
<p>File “/Users/leeboonstra/Documents/test_folder/rename_files.py”, line 7, File “/Users/leeboonstra/Documents/test_folder/rename_files.py”, line 7,</p>
<p>in &lt;module&gt; in &lt;module&gt;</p>
<p>text = toUpperCase(prefix) text = toUpperCase(prefix)</p>
<p>NameError: name ‘toUpperCase’ is not defined NameError: name ‘toUpperCase’ is not defined</p>
<p>Snippet 4. I broke the Python code Snippet 4. I broke the Python code</p>
<p>Let’s see if we can ask the large language model to debug and review code. Have a look into 让我们看看是否可以让大型语言模型调试和审查代码。请查看表19：</p>
<p>Table 19:</p>
<p>February 2025 49 2025年2月 49</p>
<p>Prompt Engineering Prompt Engineering</p>
<p>Name 1_python_debug_code Name 1_python_调试_代码</p>
<p>Goal Write a prompt to debug and review Python code. Goal 编写一个用于调试和审查Python代码的提示。</p>
<p>Model gemini-pro 模型 gemini-pro</p>
<p>Temperature 0.1 Token Limit 1024 温度 0.1 令牌限制 1024</p>
<p>Top-K N/A Top-P 1 Top-K N/A Top-P 1</p>
<p>Prompt The below Python code gives an error: 提示 The below Python code gives an error:</p>
<p>Traceback (most recent call last): Traceback (most recent call last):</p>
<p>File &quot;/ File &quot;/</p>
<p>Users/leeboonstra/Documents/test_folder/rename_files.py&quot;, line Users/leeboonstra/Documents/test_folder/rename_files.py&quot;, line</p>
<p>7, in &lt;module&gt; 7, in &lt;module&gt;</p>
<p>text = toUpperCase(prefix) text = toUpperCase(prefix)</p>
<p>NameError: name &#x27;toUpperCase&#x27; is not defined NameError: name &#x27;toUpperCase&#x27; is not defined</p>
<p>Debug what&#x27;s wrong and explain how I can improve the code. Debug what&#x27;s wrong and explain how I can improve the code.</p>
<p>\`\`\`python \`\`\`python</p>
<p>import os import os</p>
<p>import shutil import shutil</p>
<p># Get the folder name from the user # Get the folder name from the user</p>
<p>folder_name = input(&quot;Enter the folder name: &quot;) folder_name = input(&quot;Enter the folder name: &quot;)</p>
<p>prefix = input(&quot;Enter the string to prepend to the filename: &quot;) prefix = input(&quot;Enter the string to prepend to the filename: &quot;)</p>
<p>text = toUpperCase(prefix) text = toUpperCase(prefix)</p>
<p># Check if the folder exists # Check if the folder exists</p>
<p>if not os.path.isdir(folder_name): if not os.path.isdir(folder_name):</p>
<p>print(&quot;Folder does not exist.&quot;) print(&quot;Folder does not exist.&quot;)</p>
<p>exit(1) exit(1)</p>
<p># Get a list of all files in the folder # Get a list of all files in the folder</p>
<p>files = os.listdir(folder_name) files = os.listdir(folder_name)</p>
<p># Iterate over the files # Iterate over the files</p>
<p>for file in files: for file in files:</p>
<p>Continues next page... 续下页...</p>
<p>February 2025 50 2025年2月 50</p>
<p>Prompt Engineering Prompt Engineering</p>
<p>Prompt # Create a new file name with the prefix &quot;draft_&quot; 提示 # Create a new file name with the prefix &quot;draft_&quot;</p>
<p>new_filename = f&quot;{text}_{file}&quot; new_filename = f&quot;{text}_{file}&quot;</p>
<p># Move the file to the new name # Move the file to the new name</p>
<p>shutil.move(os.path.join(folder_name, file), shutil.move(os.path.join(folder_name, file),</p>
<p>os.path.join(folder_name, new_file_name)) os.path.join(folder_name, new_file_name))</p>
<p># Print a success message # Print a success message</p>
<p>print(&quot;Files renamed successfully.&quot;) print(&quot;Files renamed successfully.&quot;)</p>
<p>\`\`\` \`\`\`</p>
<p>Output The code calls the \`toUpperCase\` function to convert \`prefix\` to uppercase, but 输出 代码调用了\`toUpperCase\` 函数将\`prefix\` 转换为大写，但该函数未定义。要解</p>
<p>that function is not defined. To fix this issue, you can use the \`upper()\` method of 决此问题，可以使用\`upper()\` 方法 f</p>
<p>the string class which converts a given string into uppercase. The modified code 字符串类，该方法将给定字符串转换为大写。修改后的代码</p>
<p>is shown below: 如下所示：</p>
<p>\`\`\`python \`\`\`python</p>
<p>import os import os</p>
<p>import shutil import shutil</p>
<p># Get the folder name from the user # Get the folder name from the user</p>
<p>folder_name = input(&quot;Enter the folder name: &quot;) folder_name = input(&quot;Enter the folder name: &quot;)</p>
<p>prefix = input(&quot;Enter the string to prepend to the filename: &quot;) prefix = input(&quot;Enter the string to prepend to the filename: &quot;)</p>
<p>text = prefix.upper() text = prefix.upper()</p>
<p># Check if the folder exists # Check if the folder exists</p>
<p>if not os.path.isdir(folder_name): if not os.path.isdir(folder_name):</p>
<p>print(&quot;Folder does not exist.&quot;) print(&quot;Folder does not exist.&quot;)</p>
<p>exit(1) exit(1)</p>
<p># Get a list of all files in the folder # Get a list of all files in the folder</p>
<p>files = os.listdir(folder_name) files = os.listdir(folder_name)</p>
<p># Iterate over the files # Iterate over the files</p>
<p>for file in files: for file in files:</p>
<p># Create a new file name with the prefix &quot;draft_&quot; # Create a new file name with the prefix &quot;draft_&quot;</p>
<p>new_filename = f&quot;{text}_{file}&quot; new_filename = f&quot;{text}_{file}&quot;</p>
<p># Move the file to the new name # Move the file to the new name</p>
<p>shutil.move(os.path.join(folder_name, file), shutil.move(os.path.join(folder_name, file),</p>
<p>Continues next page... Continues next page...</p>
<p>February 2025 51 2025年2月 51</p>`
    },
    {
      title: 'Output os.path.join(folder_name, new_fil',
      level: 1,
      content: `<p>Prompt Engineering Prompt Engineering</p>
<p>Output os.path.join(folder_name, new_filename)) 输出 os.path.join(folder_name, new_filename))</p>
<p># Print a success message # Print a success message</p>
<p>print(&quot;Files renamed successfully.&quot;) print(&quot;Files renamed successfully.&quot;)</p>
<p>\`\`\` \`\`\`</p>
<p>Additionally, there are a few other improvements that can be made to the code: 此外，代码还可以做一些其他改进：</p>
<ul>
<li>1. The file extension of the new filenames is not kept. It’s better to extract the 1. 新文件名的文件扩展名没有保留。最好从原始文件名中提取</li>
</ul>
<p>extension from the original filename and append it to the new filename. 扩展名并将其附加到新文件名中。</p>
<ul>
<li>2. The code assumes that there are no spaces in the folder name. However, 2. 代码假设文件夹名称中没有空格。然而，</li>
</ul>
<p>it is a good practice to handle spaces gracefully by replacing them with 处理空格时，最好用替代字符优雅地替换它们，</p>
<p>underscores or hyphens. 下划线或连字符。</p>
<ul>
<li>3. Using the \`f\` string syntax for string interpolation is more readable and 3. Using the \`f\` string syntax for string interpolation is more readable and</li>
</ul>
<p>concise than the traditional \`+\` operator. 比传统的 \`+\` 运算符更简洁。</p>
<ul>
<li>4. The code doesn’t handle errors that might occur during the renaming process. 4. 代码未处理重命名过程中可能发生的错误 .</li>
</ul>
<p>It would be better to wrap the \`shutil.move\` call in a \`try...except\` block to 最好将 \`shutil.move\` 调用包裹在 \`try...except\` 块中，</p>
<p>catch any potential errors. 以捕获任何潜在错误。</p>
<p>Here is the improved code with these suggestions: 以下是包含这些建议的改进代码：</p>
<p>\`\`\`python \`\`\`python</p>
<p>import os import os</p>
<p>import shutil import shutil</p>
<p># Get the folder name from the user # Get the folder name from the user</p>
<p>folder_name = input(&quot;Enter the folder name: &quot;) folder_name = input(&quot;Enter the folder name: &quot;)</p>
<p>prefix = input(&quot;Enter the string to prepend to the filename: &quot;) prefix = input(&quot;Enter the string to prepend to the filename: &quot;)</p>
<p># Check if the folder exists # Check if the folder exists</p>
<p>if not os.path.isdir(folder_name): if not os.path.isdir(folder_name):</p>
<p>print(&quot;Folder does not exist.&quot;) print(&quot;Folder does not exist.&quot;)</p>
<p>exit(1) exit(1)</p>
<p># Get a list of all files in the folder # Get a list of all files in the folder</p>
<p>files = os.listdir(folder_name) files = os.listdir(folder_name)</p>
<p># Iterate over the files # Iterate over the files</p>
<p>for file in files: for file in files:</p>
<p>Continues next page... Continues nextpage...</p>
<p>February 2025 52 2025年2月 52</p>
<p>Prompt Engineering Prompt Engineering</p>
<p>Output # Get the file extension 输出 # Get the file extension</p>
<p>ext = os.path.splitext(file)[1] ext = os.path.splitext(file)[1]</p>
<p># Create a new file name with the prefix and the file extension # Create a new file name with the prefix and the file extension</p>
<p>new_filename = f&quot;{prefix}_{os.path.splitext(file)[0]}{ext}&quot; new_filename = f&quot;{prefix}_{os.path.splitext(file)[0]}{ext}&quot;</p>
<p># Build the full paths for the original and new files # Build the full paths for the original and new files</p>
<p>old_path = os.path.join(folder_name, file) old_path = os.path.join(folder_name, file)</p>
<p>new_path = os.path.join(folder_name, new_filename) new_path = os.path.join(folder_name, new_filename)</p>
<p># Try to move the file # Try to move the file</p>
<p>try: try:</p>
<p>shutil.move(old_path, new_path) shutil.move(old_path, new_path)</p>
<p>except Exception as e: except Exception as e:</p>
<p>print(f&quot;An error occurred while moving the file print(f&quot;An error occurred while moving the file</p>
<p>{file}: {e}&quot;) {file}: {e}&quot;)</p>
<p># Print a success message # Print a success message</p>
<p>print(&quot;Files renamed successfully.&quot;) print(&quot;Files renamed successfully.&quot;)</p>
<p>\`\`\` \`\`\`</p>
<p>These improvements make the code more robust and flexible while also making These improvements make the code more robust and flexible while also making</p>
<p>it easier to read and understand... (The response was truncated because 使其更易于阅读和理解⋯⋯（响应被截断是因为</p>
<p>it has reached the token limit. Try to increase the token limit if you need a 它已达到令牌限制。如果需要更长的响应，请尝试增加令牌限制</p>
<p>longer response.) 更长的回复。）</p>
<p>Table 19. A prompt for debugging and reviewing Python code 表19. 用于调试和审查Python代码的提示</p>
<p>That’s great. Not only did it tell me how to solve the problem, it also figured out that my code 太好了。它不仅告诉我如何解决问题，还发现了我的代码中有更多的错误以及如何解决它们。提</p>
<p>had more bugs and how to solve them, too. The last part of the prompt gave suggestions to 示的最后部分还给出了改进代码的一般建议。</p>
<p>improve the code in general.</p>
<p>February 2025 53 2025年2月 53</p>
<p>Prompt Engineering Prompt Engineering</p>
<p>What about multimodal prompting? 多模态提示怎么样？</p>
<p>Prompting for code still uses the same regular large language model. Multimodal prompting 代码提示仍然使用相同的常规模型。多模态提示是一个独立的问题，它指的是使用多种输入格式</p>
<p>is a separate concern, it refers to a technique where you use multiple input formats to guide 来引导大型语言模型，而不仅仅依赖文本。这可以包括文本、图像、音频、代码甚至其他格式的</p>
<p>a large language model, instead of just relying on text. This can include combinations of text, 组合，具体取决于模型的能力和任务需求。</p>
<p>images, audio, code, or even other formats, depending on the model’s capabilities and the</p>
<p>task at hand.</p>
<p>Best Practices 最佳实践</p>
<p>Finding the right prompt requires tinkering. Language Studio in Vertex AI is a perfect place to 找到合适的提示需要不断调整。Vertex AI 中的 Language Studio 是一个完美的地方，可以用</p>
<p>play around with your prompts, with the ability to test against the various models. 来试验你的提示，并能够针对各种模型进行测试。</p>
<p>Use the following best practices to become a pro in prompt engineering. 使用以下最佳实践，成为提示工程的专家。</p>
<p>Provide examples 提供示例</p>
<p>The most important best practice is to provide (one shot / few shot) examples within a 最重要的最佳实践是在提示中提供（一示例/少量示例）。这非常有效，因为它充当了强大的</p>
<p>prompt. This is highly effective because it acts as a powerful teaching tool. These examples 教学工具。这些示例展示了期望的输出或类似的响应，使模型能够从中学习并相应地调整其生</p>
<p>showcase desired outputs or similar responses, allowing the model to learn from them 成内容。就像给模型一个参考点或目标，提高其响应的准确性、风格和语气，更好地符合你的</p>
<p>and tailor its own generation accordingly. It’s like giving the model a reference point or 期望。</p>
<p>target to aim for, improving the accuracy, style, and tone of its response to better match</p>
<p>your expectations.</p>
<p>February 2025 54 2025年2月 54</p>`
    },
    {
      title: 'Examples: 示例：',
      level: 1,
      content: `<p>Prompt Engineering Prompt Engineering</p>
<p>Design with simplicity Design with simplicity</p>
<p>Prompts should be concise, clear, and easy to understand for both you and the model. As a 提示应简洁、清晰，便于您和模型理解。一般来说，如果您觉得困惑，模型也很可能会困惑。尽</p>
<p>rule of thumb, if it’s already confusing for you it will likely be also confusing for the model. Try 量避免使用复杂语言，不要提供不必要的信息。</p>
<p>not to use complex language and don’t provide unnecessary information.</p>
<p>Examples: 示例：</p>
<p>BEFORE: BEFORE:</p>
<p>I am visiting New York right now, and I&#x27;d like to hear more about great I am visiting New York right now, and I&#x27;d like to hear more about great</p>
<p>locations. I am with two 3 year old kids. Where should we go during locations. I am with two 3 year old kids. Where should we go during</p>
<p>our vacation? our vacation?</p>
<p>AFTER REWRITE: AFTER REWRITE:</p>
<p>Act as a travel guide for tourists. Describe great places to visit in Act as a travel guide for tourists. Describe great places to visit in</p>
<p>New York Manhattan with a 3 year old. New York Manhattan with a 3 year old.</p>
<p>Try using verbs that describe the action. Here’s a set of examples: 尝试使用描述动作的动词。以下是一组示例：</p>
<p>Act, Analyze, Categorize, Classify, Contrast, Compare, Create, Describe, Define, 行动，分析，分类，归类，对比，比较，创造，描述，定义，评估，提取，查找，生成，识</p>
<p>Evaluate, Extract, Find, Generate, Identify, List, Measure, Organize, Parse, Pick, 别，列出，测量，组织，解析，挑选，预测，提供，排名，推荐，返回，检索，重写，选择，</p>
<p>Predict, Provide, Rank, Recommend, Return, Retrieve, Rewrite, Select, Show, Sort, 展示，排序，总结，翻译，写作。</p>
<p>Summarize, Translate, Write.</p>
<p>February 2025 55 2025年2月 55</p>
<p>Prompt Engineering Prompt Engineering</p>
<p>Be specific about the output 明确输出内容</p>
<p>Be specific about the desired output. A concise instruction might not guide the LLM enough 明确期望的输出内容。简洁的指令可能无法充分引导大型语言模型，或者过于泛泛。通过在提</p>
<p>or could be too generic. Providing specific details in the prompt (through system or context 示中提供具体细节（通过系统提示或上下文提示）可以帮助模型聚焦于相关内容，提高整体准</p>
<p>prompting) can help the model to focus on what’s relevant, improving the overall accuracy. 确性。</p>
<p>Examples: Examples:</p>
<p>DO: DO:</p>
<p>Generate a 3 paragraph blog post about the top 5 video game consoles. Generate a 3 paragraph blog post about the top 5 video game consoles.</p>
<p>The blog post should be informative and engaging, and it should be The blog post should be informative and engaging, and it should be</p>
<p>written in a conversational style. written in a conversational style.</p>
<p>DO NOT: 不要：</p>
<p>Generate a blog post about video game consoles. Generate a blog post about video game consoles.</p>
<p>Use Instructions over Constraints 使用指令而非约束</p>
<p>Instructions and constraints are used in prompting to guide the output of a LLM. 指令和约束用于提示中以引导大型语言模型的输出。</p>
<ul>
<li>An instruction provides explicit instructions on the desired format, style, or content of the • 指令提供了关于期望格式、风格或内容的明确说明。它指导模型应该做什么或生成什么。</li>
</ul>
<p>response. It guides the model on what the model should do or produce.</p>
<ul>
<li>A constraint is a set of limitations or boundaries on the response. It limits what the model • 约束是一组对响应的限制或边界。它限制模型不应该做什么或应避免什么。</li>
</ul>
<p>should not do or avoid.</p>
<p>February 2025 56 2025年2月 56</p>
<p>Prompt Engineering Prompt Engineering</p>
<p>Growing research suggests that focusing on positive instructions in prompting can be more 越来越多的研究表明，在提示中关注积极的指令比过度依赖限制更有效。这种方法符合人类更</p>
<p>effective than relying heavily on constraints. This approach aligns with how humans prefer 喜欢积极指令而非禁止事项列表的习惯。</p>
<p>positive instructions over lists of what not to do.</p>
<p>Instructions directly communicate the desired outcome, whereas constraints might leave the 指令直接传达期望的结果，而限制可能让模型猜测什么是允许的。它在定义的边界内提供灵活性</p>
<p>model guessing about what is allowed. It gives flexibility and encourages creativity within the 并鼓励创造力，而限制可能限制模型的潜力。同时，限制列表</p>
<p>defined boundaries, while constraints can limit the model’s potential. Also a list of constraints</p>
<p>can clash with each other. 可能彼此冲突。</p>
<p>Constraints are still valuable but in certain situations. To prevent the model from generating 限制在某些情况下仍然有价值。比如防止模型生成有害或偏见内容，或当需要严格的输出格式</p>
<p>harmful or biased content or when a strict output format or style is needed. 或风格时。</p>
<p>If possible, use positive instructions: instead of telling the model what not to do, tell it what to 如果可能，使用积极的指令：与其告诉模型不该做什么，不如告诉它该做什么。这可以避免混淆</p>
<p>do instead. This can avoid confusion and improve the accuracy of the output. 并提高输出的准确性。</p>
<p>DO: DO:</p>
<p>Generate a 1 paragraph blog post about the top 5 video game consoles. Generate a 1 paragraph blog post about the top 5 video game consoles.</p>
<p>Only discuss the console, the company who made it, the year, and total Only discuss the console, the company who made it, the year, and total</p>
<p>sales. sales.</p>
<p>DO NOT: 请勿：</p>
<p>Generate a 1 paragraph blog post about the top 5 video game consoles. Generate a 1 paragraph blog post about the top 5 video game consoles.</p>
<p>Do not list video game names. Do not list video game names.</p>
<p>As a best practice, start by prioritizing instructions, clearly stating what you want the model 作为最佳实践，首先优先考虑指令，清楚地说明你希望模型做什么，只有在安全、清晰或特定</p>
<p>to do and only use constraints when necessary for safety, clarity or specific requirements. 需求时才使用约束。通过实验和迭代测试不同的指令和约束组合，找到最适合你具体任务的方</p>
<p>Experiment and iterate to test different combinations of instructions and constraints to find 法，并进行记录。</p>
<p>what works best for your specific tasks, and document these.</p>
<p>February 2025 57 2025年2月 57</p>`
    },
    {
      title: 'Control the max token length 控制最大令牌长度',
      level: 1,
      content: `<p>Prompt Engineering Prompt Engineering</p>
<p>Control the max token length 控制最大令牌长度</p>
<p>To control the length of a generated LLM response, you can either set a max token limit in the 要控制生成的大型语言模型响应的长度，您可以在配置中设置最大令牌限制，或者在提示中明确</p>
<p>configuration or explicitly request a specific length in your prompt. For example: 请求特定长度。例如：</p>
<p>&quot;Explain quantum physics in a tweet length message.&quot; &quot;Explain quantum physics in a tweet length message.&quot;</p>
<p>Use variables in prompts 在提示中使用变量</p>
<p>To reuse prompts and make it more dynamic use variables in the prompt, which can be 为了重用提示并使其更具动态性，可以在提示中使用变量，这些变量可以针对不同的输入进行</p>
<p>changed for different inputs. E.g. as shown in Table 20, a prompt which gives facts about a 更改。例如，如表20所示，一个提供城市相关事实的提示。不要在提示中硬编码城市名称，</p>
<p>city. Instead of hardcoding the city name in the prompt, use a variable. Variables can save 而是使用变量。变量可以节省时间和精力，避免重复劳动。如果需要在多个提示中使用相同的</p>
<p>you time and effort by allowing you to avoid repeating yourself. If you need to use the same 信息，可以将其存储在变量中，然后在每个提示中引用该变量。当将提示集成到自己的应用程</p>
<p>piece of information in multiple prompts, you can store it in a variable and then reference 序中时，这非常有意义。</p>
<p>that variable in each prompt. This makes a lot of sense when integrating prompts into your</p>
<p>own applications.</p>
<p>Prompt VARIABLES 提示 VARIABLES</p>
<p>{city} = &quot;Amsterdam&quot; {city} = &quot;Amsterdam&quot;</p>
<p>PROMPT PROMPT</p>
<p>You are a travel guide. Tell me a fact about the city: {city} You are a travel guide. Tell me a fact about the city: {city}</p>
<p>Output Amsterdam is a beautiful city full of canals, bridges, and narrow streets. It’s a 输出 阿姆斯特丹是一座美丽的城市，充满了运河、桥梁和狭窄的街道。它是一个</p>
<p>great place to visit for its rich history, culture, and nightlife. 因其丰富的历史、文化和夜生活而值得一游的好地方。</p>
<p>Table 20. Using variables in prompts 表20. 在提示中使用变量</p>
<p>February 2025 58 2025年2月 58</p>
<p>Prompt Engineering Prompt Engineering</p>
<p>Experiment with input formats and writing styles 尝试不同的输入格式和写作风格</p>
<p>Different models, model configurations, prompt formats, word choices, and submits can yield 不同的模型、模型配置、提示格式、用词选择和提交方式会产生不同的结果。因此，尝试提示属</p>
<p>different results. Therefore, it’s important to experiment with prompt attributes like the style, 性如风格、用词选择和提示类型（零样本、少样本、系统提示）非常重要。</p>
<p>the word choice, and the type prompt (zero shot, few shot, system prompt).</p>
<p>For example a prompt with the goal to generate text about the revolutionary video game 例如，关于革命性游戏主机世嘉梦幻之星的提示，可以被表述为问题、陈述或指令，从而产生</p>
<p>console Sega Dreamcast, can be formulated as a question, a statement or an instruction, 不同的输出：</p>
<p>resulting in different outputs:</p>
<ul>
<li>Question: What was the Sega Dreamcast and why was it such a revolutionary console? • 问题：世嘉梦幻之星（Sega Dreamcast）是什么，为什么它是一款如此革命性的游戏机？</li>
<li>Statement: The Sega Dreamcast was a sixth-generation video game console released by • 陈述：世嘉梦幻之星是世嘉于1999年发布的第六代视频游戏主机。它⋯⋯</li>
</ul>
<p>Sega in 1999. It...</p>
<ul>
<li>Instruction: Write a single paragraph that describes the Sega Dreamcast console and • 说明：写一段描述世嘉梦幻之星游戏机并解释其革命性原因的段落。</li>
</ul>
<p>explains why it was so revolutionary.</p>
<p>For few-shot prompting with classification tasks, mix up 对于带有分类任务的少样本提示，将类别混合使用</p>
<p>the classes</p>
<p>Generally speaking, the order of your few-shots examples should not matter much. However, 一般来说，你的少量示例的顺序不应有太大影响。然而，在进行分类任务时，确保在少量示例中</p>
<p>when doing classification tasks, make sure you mix up the possible response classes in the 混合可能的响应类别。这是因为否则你可能会过度拟合示例的特定顺序。通过混合可能的响应类</p>
<p>few shot examples. This is because you might otherwise be overfitting to the specific order of 别，你可以确保模型学习识别每个类别的关键特征，而不仅仅是记忆示例的顺序。这将导致在未</p>
<p>the examples. By mixing up the possible response classes, you can ensure that the model is 见数据上的性能更加稳健和具有泛化能力。</p>
<p>learning to identify the key features of each class, rather than simply memorizing the order of</p>
<p>the examples. This will lead to more robust and generalizable performance on unseen data.</p>
<p>February 2025 59 2025年2月 59</p>
<p>Prompt Engineering Prompt Engineering</p>
<p>A good rule of thumb is to start with 6 few shot examples and start testing the accuracy 一个好的经验法则是从6个少量示例开始，然后从那里开始测试准确性。</p>
<p>from there.</p>
<p>Adapt to model updates 适应模型更新</p>
<p>It’s important for you to stay on top of model architecture changes, added data, and 紧跟模型架构的变化、新增数据和功能非常重要。尝试使用更新的模型版本，并调整你的提示</p>
<p>capabilities. Try out newer model versions and adjust your prompts to better leverage new 以更好地利用新模型的特性。像Vertex AI Studio这样的工具非常适合存储、测试和记录你提</p>
<p>model features. Tools like Vertex AI Studio are great to store, test, and document the various 示的各个版本。</p>
<p>versions of your prompt.</p>
<p>Experiment with output formats 尝试不同的输出格式</p>
<p>Besides the prompt input format, consider experimenting with the output format. For non- 除了提示输入格式外，还可以尝试不同的输出格式。对于提取、选择、解析、排序、排名或分</p>
<p>creative tasks like extracting, selecting, parsing, ordering, ranking, or categorizing data try 类数据等非创意任务，尝试让输出以结构化格式返回，如 JSON 或 XML。</p>
<p>having your output returned in a structured format like JSON or XML.</p>
<p>There are some benefits in returning JSON objects from a prompt that extracts data. In 从提示中返回 JSON 对象有一些好处。在实际应用中，我不需要手动创建这种 JSON 格式，我</p>
<p>a real-world application I don’t need to manually create this JSON format, I can already 可以直接返回排序后的数据（在处理日期时间对象时非常方便），但最重要的是，通过提示要</p>
<p>return the data in a sorted order (very handy when working with datetime objects), but most 求 JSON 格式，迫使模型创建结构并限制幻觉。</p>
<p>importantly, by prompting for a JSON format it forces the model to create a structure and</p>
<p>limit hallucinations.</p>
<p>In summary, benefits of using JSON for your output: 总之，使用 JSON 作为输出的好处有：</p>
<ul>
<li>Returns always in the same style • 始终以相同的样式返回</li>
<li>Focus on the data you want to receive • Focus on the data you want to receive</li>
</ul>
<p>February 2025 60 2025年2月 60</p>`
    }
  ]
};

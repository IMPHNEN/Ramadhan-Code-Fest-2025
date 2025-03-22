    document.addEventListener('DOMContentLoaded', function() {
        const chatMessages = document.getElementById('chat-messages');
        const userInput = document.getElementById('user-input');
        const sendButton = document.getElementById('send-button');
        
        
        let sessionId = localStorage.getItem('chatSessionId');
        
        
        if (!sessionId) {
            sessionId = null;
        }

        
        marked.setOptions({
            breaks: true,
            gfm: true,
            headerIds: false,
            highlight: function(code, lang) {
                if (lang && hljs.getLanguage(lang)) {
                    return hljs.highlight(code, { language: lang }).value;
                }
                return hljs.highlightAuto(code).value;
            }
        });

        function formatAIResponse(text) {
            if (typeof text !== 'string') {
                console.warn('Received non-string response:', text);
                text = String(text || 'Maaf, terjadi kesalahan pada respons server.');
            }
            
            let thinkingContent = '';
            const thinkMatch = text.match(/<think>([\s\S]*?)<\/think>/);
            
            if (thinkMatch) {
                thinkingContent = thinkMatch[1].trim();
                text = text.replace(/<think>[\s\S]*?<\/think>/, '').trim();
            }
            
            text = text.replace(/\\n/g, ' ');
            text = text.replace(/\*\*(.*?)\*\*/g, '**$1**');
            let formattedText = marked.parse(text);
            
            if (thinkingContent) {
                formattedText += `
                <div class="thinking-section">
                    <div class="thinking-header">
                        <i class="fas fa-brain"></i> Proses Berpikir AI
                    </div>
                    <div class="thinking-content">${thinkingContent}</div>
                </div>`;
            }
            
            return formattedText;
        }

        
        function addMessage(message, isUser = false) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message');
            messageDiv.classList.add(isUser ? 'user-message' : 'ai-message');

            const messageContent = document.createElement('div');
            messageContent.classList.add('message-content');
            
            if (isUser) {
                messageContent.textContent = message;
            } else {
                
                messageContent.innerHTML = formatAIResponse(message);
            }
            
            messageDiv.appendChild(messageContent);
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function showTypingIndicator() {
            const indicator = document.createElement('div');
            indicator.classList.add('typing-indicator');
            indicator.id = 'typing-indicator';
            
            for (let i = 0; i < 3; i++) {
                const dot = document.createElement('span');
                indicator.appendChild(dot);
            }
            
            chatMessages.appendChild(indicator);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        
        function removeTypingIndicator() {
            const indicator = document.getElementById('typing-indicator');
            if (indicator) {
                indicator.remove();
            }
        }
        
        async function sendMessageToAPI(message) {
            try {
                showTypingIndicator();
                
                
                let chatHistory = [];
                if (sessionId) {
                    const savedHistory = localStorage.getItem('chatHistory_' + sessionId);
                    if (savedHistory) {
                        chatHistory = JSON.parse(savedHistory);
                    }
                } else {
                    
                    sessionId = Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
                    localStorage.setItem('chatSessionId', sessionId);
                }
                
                
                chatHistory.push({ role: 'user', content: message });
                
                
                if (chatHistory.length > 40) {
                    chatHistory = chatHistory.slice(-40);
                }
                
                
                let contextPrompt = '';
                chatHistory.forEach(msg => {
                    if (msg.role === 'user') {
                        contextPrompt += `User: ${msg.content}\n`;
                    } else {
                        contextPrompt += `Assistant: ${msg.content}\n`;
                    }
                });
                contextPrompt += 'Assistant:';
                
                
                const apiEndpoints = [
                    'https://deepseek-r1-api.mistra.top/ai/llm/deepseek-r1?prompt=',
                    'https://api.mistra.top/ai/llm/deepseek-r1?prompt='
                ];
                
                
                const proxyOptions = [
                    { name: 'cors-proxy.htmldriven.com', url: 'https://cors-proxy.htmldriven.com/?url=' },
                    { name: 'api.allorigins.win', url: 'https://api.allorigins.win/raw?url=' },
                    { name: 'cors.bridged.cc', url: 'https://cors.bridged.cc/' },
                    { name: 'thingproxy.freeboard.io', url: 'https://thingproxy.freeboard.io/fetch/' }
                ];
                
                let result = null;
                let apiUsed = null;
                let proxyUsed = null;
                
                
                for (const apiUrl of apiEndpoints) {
                    if (result) break; 
                    
                    console.log(`Request API: ${apiUrl}`);
                    
                    
                    for (const proxy of proxyOptions) {
                        try {
                            console.log(`use cors proxy: ${proxy.name} untuk ${apiUrl}`);
                            const fullUrl = proxy.url + encodeURIComponent(apiUrl + encodeURIComponent(contextPrompt));
                            
                            const response = await fetch(fullUrl);
                            
                            if (!response.ok) {
                                console.warn(`Proxy ${proxy.name} error, status: ${response.status}`);
                                continue;
                            }
                            
                            const data = await response.json();
                            if (data && data.result) {
                                result = data.result;
                                apiUsed = apiUrl;
                                proxyUsed = proxy.name;
                                console.log(`success request api: ${apiUrl} proxy: ${proxy.name}`);
                                break;
                            }
                        } catch (proxyError) {
                            console.warn(`error use cors proxy: ${proxy.name}:`, proxyError);
                        }
                    }
                }
                
                if (!result) {
                    throw new Error("all api access method failed");
                }
                
                console.log(`success request api: ${apiUsed} proxy: ${proxyUsed}`);
                chatHistory.push({ role: 'assistant', content: result });
                localStorage.setItem('chatHistory_' + sessionId, JSON.stringify(chatHistory));
                
                return result;
            } catch (error) {
                console.error('Error:', error);
                return `sorry, error when contacting server: ${error.message}. please try again later.`;
            } finally {
                removeTypingIndicator();
            }
        }

        
        async function loadChatHistory() {
            if (!sessionId) {
                
                return;
            }
            
            try {
                const savedHistory = localStorage.getItem('chatHistory_' + sessionId);
                if (savedHistory) {
                    const chatHistory = JSON.parse(savedHistory);
                    chatMessages.innerHTML = ''; 
                    chatHistory.forEach(message => {
                        addMessage(message.content, message.role === 'user');
                    });
                }
                
            } catch (error) {
                console.error('Error loading chat history:', error);
                addMessage('sorry, error when loading chat history.', false);
            }
        }

        
        loadChatHistory();
        sendButton.addEventListener('click', async function() {
            const message = userInput.value.trim();
            if (message === '') return;
            
            addMessage(message, true);
            userInput.value = '';
            
            try {
                const aiResponse = await sendMessageToAPI(message);
                addMessage(aiResponse);
            } catch (error) {
                console.error('Error in sending message:', error);
                addMessage('sorry, error when contacting server.', false);
            }
        });

        
        userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendButton.click();
            }
        });
        
        const chatHeader = document.querySelector('.chat-header');
        const clearButton = document.createElement('button');
        clearButton.innerHTML = '<i class="fas fa-trash"></i>';
        clearButton.classList.add('clear-button');
        clearButton.title = 'Bersihkan Percakapan';
        chatHeader.appendChild(clearButton);
        
        
        const style = document.createElement('style');
        style.textContent = `
            .clear-button {
                background: rgba(255, 255, 255, 0.2);
                border: none;
                width: 35px;
                height: 35px;
                border-radius: 50%;
                color: white;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                right: 20px;
                top: 20px;
                transition: all 0.3s;
            }
            
            .clear-button:hover {
                background: rgba(255, 0, 0, 0.3);
            }
            
            .chat-header {
                position: relative;
            }
        `;
        document.head.appendChild(style);
        
        clearButton.addEventListener('click', function() {
            if (confirm('Are you sure you want to clear this conversation?')) {
                try {
                    if (sessionId) {
                        localStorage.removeItem('chatHistory_' + sessionId);
                    }
                    localStorage.removeItem('chatSessionId');
                    sessionId = null;
                    chatMessages.innerHTML = '';
                } catch (error) {
                    console.error('Error clearing chat:', error);
                    alert('Failed to delete chat history');
                }
            }
        });
    });



    // ---------------------------------- // /file/projectgabut/script.js // ---------------------------------- //

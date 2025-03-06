export default function createdMessangeElement(message) {
  if (message.nicknameMessage === 'You') {
    return `
    <div class="you-chat-message-item">
      <div class="you-nikename-data">
        ${message.nicknameMessage}, ${message.dataMessage}
      </div>
      <p class="you-text-message">${message.textMessage}</p>
    </div>`;
  }
  return `
    <div class="chat-message-item">
      <div class="nikename-data">
        ${message.nicknameMessage}, ${message.dataMessage}
      </div>
      <p class="text-message">${message.textMessage}</p>
    </div>`;
}

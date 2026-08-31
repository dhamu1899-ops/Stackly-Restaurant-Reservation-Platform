// Concierge Page Controller

document.addEventListener('DOMContentLoaded', () => {
  renderNavbar('concierge');
  renderFooter();
});

function setConciergeView(view) {
  const formBox = document.getElementById('concierge-form-container');
  const chatBox = document.getElementById('concierge-chat-container');
  const btnForm = document.getElementById('btn-view-form');
  const btnChat = document.getElementById('btn-view-chat');

  if (view === 'form') {
    if (formBox) formBox.classList.remove('hidden');
    if (chatBox) chatBox.classList.add('hidden');
    if (btnForm) btnForm.className = 'flex-1 rounded-2xl bg-amber-400 text-black py-3 text-xs font-bold shadow-lg transition-all cursor-pointer';
    if (btnChat) btnChat.className = 'flex-1 rounded-2xl border border-[#2c2f42] bg-[#161826] text-white py-3 text-xs font-bold hover:border-amber-400 transition-all cursor-pointer';
  } else {
    if (formBox) formBox.classList.add('hidden');
    if (chatBox) chatBox.classList.remove('hidden');
    if (btnForm) btnForm.className = 'flex-1 rounded-2xl border border-[#2c2f42] bg-[#161826] text-white py-3 text-xs font-bold hover:border-amber-400 transition-all cursor-pointer';
    if (btnChat) btnChat.className = 'flex-1 rounded-2xl bg-amber-400 text-black py-3 text-xs font-bold shadow-lg transition-all cursor-pointer';
  }
}

function sendConciergeChatMessage(e) {
  e.preventDefault();
  const input = document.getElementById('chat-input-text');
  const container = document.getElementById('concierge-chat-messages');
  if (!input || !container || !input.value.trim()) return;

  const userText = input.value.trim();
  input.value = '';

  // Append User message
  const userMsg = document.createElement('div');
  userMsg.className = 'flex justify-end gap-2';
  userMsg.innerHTML = `
    <div class="rounded-2xl rounded-tr-none bg-amber-500/20 border border-amber-500/40 p-3 max-w-[85%] text-amber-200">
      <p>${userText}</p>
      <span class="text-[9px] text-amber-400/70 mt-1 block text-right">Just now</span>
    </div>
  `;
  container.appendChild(userMsg);
  container.scrollTop = container.scrollHeight;

  // Auto agent response simulation
  setTimeout(() => {
    const agentMsg = document.createElement('div');
    agentMsg.className = 'flex gap-2';
    agentMsg.innerHTML = `
      <div class="rounded-2xl rounded-tl-none bg-[#1c1f2e] border border-[#2b2e42] p-3 max-w-[85%] text-stone-200">
        <p>Understood. I have logged your request regarding "<em>${userText}</em>". Our Maître D' team is checking our proprietary allotment ledger across partner restaurants. I will hold this line for you.</p>
        <span class="text-[9px] text-[#71717a] mt-1 block">Just now</span>
      </div>
    `;
    container.appendChild(agentMsg);
    container.scrollTop = container.scrollHeight;
    store.showToast('Maître Concierge Replying', 'Lady Genevieve responded to your live chat inquiry.', 'gold');
  }, 1000);
}

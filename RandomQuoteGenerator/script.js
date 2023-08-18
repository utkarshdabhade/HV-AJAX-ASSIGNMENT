const quoteElement = document.querySelector('.quote p');
const newQuoteButton = document.getElementById('new-quote-btn');
const apiUrl = 'https://type.fit/api/quotes';

async function fetchRandomQuote() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const randomQuote = data[Math.floor(Math.random() * data.length)];
    
    const quoteText = `"${randomQuote.text}"`;
    const authorText = `- ${randomQuote.author || 'Unknown'}`;
    
    quoteElement.innerHTML = `${quoteText}<br>${authorText}`;
  } catch (error) {
    console.error('Error fetching quote:', error);
    quoteElement.textContent = 'Error fetching quote';
  }
}

fetchRandomQuote();
newQuoteButton.addEventListener('click', fetchRandomQuote);

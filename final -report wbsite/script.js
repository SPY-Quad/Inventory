
document.getElementById("fetchData").addEventListener("click", fetchData);
document.getElementById("generatePdf").addEventListener("click", generatePdf);

// Fetch data based on user input
async function fetchData() {
    const query = document.getElementById("searchQuery").value.trim();
    const dataDiv = document.getElementById("data");
    const generatePdfButton = document.getElementById("generatePdf");

    // Clear previous data and disable PDF button
    dataDiv.innerHTML = "Fetching data...";
    generatePdfButton.disabled = true;

    if (!query) {
        dataDiv.innerHTML = "Please enter a valid search query.";
        return;
    }

    try {
        // Fetch data from Wikipedia API
        const response = await fetch(
            `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=${encodeURIComponent(query)}`
        );

        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const data = await response.json();
        displayData(data.query.search);

        // Enable the "Generate PDF" button
        generatePdfButton.disabled = false;
    } catch (error) {
        dataDiv.innerHTML = `Failed to fetch data: ${error.message}`;
        console.error(error);
    }
}

// Display fetched data on the page
function displayData(results) {
    const dataDiv = document.getElementById("data");
    dataDiv.innerHTML = `<h2>Search Results:</h2>`;

    if (results.length === 0) {
        dataDiv.innerHTML += "<p>No results found.</p>";
        return;
    }

    results.forEach((result) => {
        dataDiv.innerHTML += `
            <div>
                <h3>${result.title}</h3>
                <p>${result.snippet}...</p>
                <a href="https://en.wikipedia.org/?curid=${result.pageid}" target="_blank">Read more</a>
            </div>
            <hr>
        `;
    });
}

// Generate PDF using jsPDF
function generatePdf() {
    const jsPDF = window.jspdf.jsPDF;
    const pdf = new jsPDF();

    // Add title to PDF
    pdf.setFontSize(16);
    pdf.text("Search Results", 10, 10);

    // Add fetched data
    const dataDiv = document.getElementById("data");
    const text = dataDiv.innerText;
    const lines = pdf.splitTextToSize(text, 180); // Split text for page width
    pdf.text(lines, 10, 20);

    // Save the PDF
    pdf.save("search_results.pdf");
}
document.getElementById("login-button").addEventListener("click", function () {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Simple validation (you can replace this with actual authentication)
    if (username === "admin" && password === "1234") {
        alert("Login successful!");
        document.getElementById("login-page").style.display = "none";
        document.getElementById("search-page").style.display = "block";
    } else {
        alert("Invalid username or password!");
    }
});


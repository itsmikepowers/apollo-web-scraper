document.addEventListener('DOMContentLoaded', function() {
    const startScrapingBtn = document.getElementById('startScraping');
    const exportCSVBtn = document.getElementById('exportCSV');

    // Listen for the start scraping button click
    startScrapingBtn.addEventListener('click', function() {
        // Send a message to the background script to start scraping
        chrome.runtime.sendMessage({action: "startScraping"}, function(response) {
            console.log(response);
        });
    });

    // Listen for the export CSV button click
    exportCSVBtn.addEventListener('click', function() {
        // Send a message to the background script to export the data as CSV
        chrome.runtime.sendMessage({action: "exportCSV"}, function(response) {
            if (response.csvUrl) {
                // Create a temporary link to download the CSV
                const downloadLink = document.createElement('a');
                downloadLink.href = response.csvUrl;
                downloadLink.setAttribute('download', 'scraped_data.csv');
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            }
        });
    });
});

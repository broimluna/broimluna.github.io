function openTab(tabName) {
    const sidebar = document.querySelector('#sidebar');
    if (!sidebar) return; // Exit if sidebar is not found

    const buttons = sidebar.querySelectorAll('button');

    // Remove 'active' class from all sidebar buttons
    buttons.forEach(button => button.classList.remove('active'));

    // Show the selected tab
    const alltabs = document.querySelectorAll('.tab');
    alltabs.forEach(tab => tab.classList.remove('active'));
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Add 'active' class to the corresponding button
    const activeButton = document.getElementsByClassName(tabName + 'hbutton');
    if (activeButton.length > 0) {
        activeButton[0].classList.add('active'); // Apply to the first matching element
    }
}
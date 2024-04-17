function promptPromotion(employeeName, employeeId) 
{
    const confirmation = window.confirm(`Are you sure you want to promote ${employeeName} to Manager?`);
    if (confirmation) {
        const adminCode = prompt("Please enter the admin code:");
        if (adminCode !== null && adminCode !== "") {
            promoteEmployee(employeeId, adminCode);
        } else {
            alert("Admin code cannot be empty. Try again");
        }
    }
}

function promoteEmployee(employeeId, adminCode) 
{
    const userId = '<%= user._id %>';
    fetch('/promoteemp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: userId,
            employeeId: employeeId,
            adminCode: adminCode
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); 
        window.location.reload(); 
    })
    .catch(error => {
        console.error('Error promoting employee:', error);
        alert('Error promoting employee. Please try again.');
    });
}

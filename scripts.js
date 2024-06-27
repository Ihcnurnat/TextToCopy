document.addEventListener('DOMContentLoaded', function() {
    // Initial setup
    document.getElementById('addButton').addEventListener('click', addInputField);

    // Add event listener for "Enter" key to add input field
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && document.activeElement.tagName.toLowerCase() !== 'input') {
            addInputField();
        }
    });

    // Add event listener for copy button clicks (delegated to parent)
    document.getElementById('inputFields').addEventListener('click', function(event) {
        if (event.target && event.target.classList.contains('copy-button')) {
            copyTextToClipboard(event.target.previousElementSibling.value);
        } else if (event.target && event.target.classList.contains('delete-button')) {
            deleteInputField(event.target.parentNode);
        }
    });

    // Add event listener for "Ctrl+D+number" key combinations to copy text (if desired)
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key.startsWith('d')) {
            var numberKey = event.key.replace('d', '');
            var lineNumber = parseInt(numberKey);

            if (!isNaN(lineNumber) && lineNumber > 0) {
                copyTextByLineNumber(lineNumber);
            }
        }
    });
});

function addInputField() {
    var inputFields = document.getElementById('inputFields');

    var inputGroup = document.createElement('div');
    inputGroup.classList.add('input-group');

    var input = document.createElement('input');
    input.type = 'text';
    input.classList.add('input-text');
    input.placeholder = 'Enter text...';

    var copyButton = document.createElement('button');
    copyButton.textContent = 'Copy';
    copyButton.classList.add('copy-button', 'purple-button');

    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.classList.add('delete-button', 'purple-button');

    inputGroup.appendChild(input);
    inputGroup.appendChild(copyButton);
    inputGroup.appendChild(deleteButton);
    inputFields.appendChild(inputGroup);
}

function deleteInputField(inputGroup) {
    inputGroup.parentNode.removeChild(inputGroup);
}

function copyTextToClipboard(text) {
    // Create a temporary textarea element to hold the text
    var tempTextArea = document.createElement('textarea');
    tempTextArea.value = text;

    // Append the textarea to the body
    document.body.appendChild(tempTextArea);

    // Select the text
    tempTextArea.select();

    // Copy the text
    document.execCommand('copy');

    // Remove the temporary textarea
    document.body.removeChild(tempTextArea);

    // Show notification
    showNotification('Text copied!');
}

function copyTextByLineNumber(lineNumber) {
    var inputFields = document.getElementsByClassName('input-text');
    if (lineNumber <= inputFields.length) {
        copyTextToClipboard(inputFields[lineNumber - 1].value);
    }
}

function showNotification(message) {
    var notification = document.createElement('div');
    notification.innerText = message;
    notification.style.position = 'fixed';
    notification.style.bottom = '10px';
    notification.style.right = '10px';
    notification.style.padding = '10px';
    notification.style.backgroundColor = '#333';
    notification.style.color = 'white';
    notification.style.borderRadius = '5px';
    notification.style.zIndex = '9999';
    document.body.appendChild(notification);

    // Hide after 2 seconds
    setTimeout(function() {
        notification.style.display = 'none';
    }, 2000);
}

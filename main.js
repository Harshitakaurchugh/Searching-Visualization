let sections = [
    {
        name: "Linear Search",
        details: "Details for Linear Search",
        children: [
            {
                name: "56 67 82 102 135 567 1005",
                details: "Details for Sorted Array",
                children: [],
                
            },
            {
                name: "45 98 43 82 76 10",
                details: "Details for Unsorted Array",
                children: [],
                
            },
            {
                name: "1 2 5 8 6 8 15 82 58 ",
                details: "Details for Unsorted Array",
                children: [],
                
            }
        ]
    },
    {
        name: "Binary Search",
        details: "Details for Section 2",
        children: [
            {
                name: "2 4 6 8 10 82 98",
                details: "Details for sorted array",
                children: [],
                subname: "binarysearch"
            },
            {
                name: "2 6 8 10 23 32 45 67 82 98 109 187",
                details: "Details for long sorted array",
                children: [],
                subname: "binarysearch"
            }
        ]
    }
];
function binarySearch(passedArray, passedTarget) {
    

    if (passedArray) {
        array = passedArray;
    } else {
        const arrayStr = document.getElementById("array").value;
        if (!arrayStr) {
            alert("Please enter a valid array.");
            return;
        }
        array = arrayStr.split(" ").map(Number);
    }

    if (passedTarget !== undefined) {
        target = passedTarget;
    } else {
        const targetStr = document.getElementById("target").value;
        target = parseInt(targetStr, 10);
        if (isNaN(target)) {
            alert("Please enter a valid target value.");
            return;
        }
    }
    console.log("hello");
    const arrayStr = document.getElementById("array").value;
    const target = parseInt(document.getElementById("target").value);
    

    

    const array = arrayStr.split(" ").map(Number);
    const arrayContainer = document.getElementById("array-container");
    const resultElement = document.getElementById("result");
    resultElement.innerText = "";

    arrayContainer.innerHTML = "";

    function appendRow(numbers, currentIndex) {
        const row = document.createElement("div");
        row.className = "array-row";

        // center se start ker rhe hai
        const centerIndex = Math.floor(numbers.length / 2);

        // Calculate the starting and ending indices for this row
        let start = Math.max(0, centerIndex - currentIndex);
        let end = Math.min(numbers.length - 1, centerIndex + currentIndex);

        for (let i = start; i <= end; i++) {
            const item = document.createElement("div");
            item.className = "array-item";

            if (i === centerIndex) {
                item.classList.add("active");
            }

            item.innerText = numbers[i];
            row.appendChild(item);
        }

        arrayContainer.appendChild(row);
    }

    function processItem(i) {
        appendRow(array, i);

        if (array[i] === target) {
            resultElement.innerText = `Found ${target} at index ${i}.`;
            return; // Stop if the item is found
        }

        if (i < array.length - 1) {
            setTimeout(() => processItem(i + 1), 3000); // Delay before the next iteration
        } else {
            resultElement.innerText = `${target} not found in the array.`;
        }
    }

    processItem(0);

}


function linearSearch(passedArray, passedTarget) {
    // console.log("hi");
    let array, target;

    if (passedArray) {
        array = passedArray;
    } else {
        const arrayStr = document.getElementById("array").value;
        if (!arrayStr) {
            alert("Please enter a valid array.");
            return;
        }
        array = arrayStr.split(" ").map(Number);
    }

    if (passedTarget !== undefined) {
        target = passedTarget;
    } else {
        const targetStr = document.getElementById("target").value;
        target = parseInt(targetStr, 10);
        if (isNaN(target)) {
            alert("Please enter a valid target value.");
            return;
        }
    }

    // const array = arrayStr.split(" ").map(Number);
    const arrayContainer = document.getElementById("array-container");
    const resultElement = document.getElementById("result");
    resultElement.innerText = "";

    arrayContainer.innerHTML = "";

    function appendRow(numbers, currentIndex) {
        const row = document.createElement("div");
        row.className = "array-row";

        for (let index = 0; index <= currentIndex; index++) {
            const item = document.createElement("div");
            item.className = "array-item";
            item.innerText = numbers[index];
            if (index === currentIndex) {
                item.classList.add("active"); // Highlight the current item being compared
            }
            // if (index !== currentIndex) {
            //     resultElement.innerText = `Element at index ${index} is not equal to the target ${target}.`;
            // }

            row.appendChild(item);
        }
        arrayContainer.appendChild(row);
    }

    // Recursive function to process each item with a delay
    function processItem(i) {
        appendRow(array, i);

        if (array[i] === target) {
            resultElement.innerText = `Found ${target} at index ${i}.`;
            return; // Stop if the item is found
        }

        if (i < array.length - 1) {
            setTimeout(() => processItem(i + 1), 3000); // Delay before the next iteration
        } else {
            resultElement.innerText = `${target} not found in the array.`;
        }
    }

    processItem(0);


}

const themeToggleButton = document.getElementById('toggle-theme');
const bodyElement = document.body;
const sidebarElement = document.querySelector('.sidebar');
const mainContentElement = document.querySelector('.main-content');
let sidebarList = document.createElement('ul');;

themeToggleButton.addEventListener('click', function () {
    if (bodyElement.classList.contains('dark-theme')) {
        bodyElement.classList.remove('dark-theme');
        sidebarElement.classList.remove('dark-theme');
        mainContentElement.classList.remove('dark-theme');
        themeToggleButton.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        bodyElement.classList.add('dark-theme');
        sidebarElement.classList.add('dark-theme');
        mainContentElement.classList.add('dark-theme');
        themeToggleButton.innerHTML = '<i class="fas fa-sun"></i>';
    }
});

let deletedSectionsCounter = 0;
const findSectionByName = (name, sections) => {
    for (let section of sections) {
        if (section.name === name) return section;
        if (section.children.length) {
            const found = findSectionByName(name, section.children);
            if (found) return found;
        }
    }
    return null;
};
const updateSectionName = (oldName, newName, sections) => {
    for (let section of sections) {
        if (section.name === oldName) {
            section.name = newName;
            return true;
        }
        if (section.children.length) {
            if (updateSectionName(oldName, newName, section.children)) return true;
        }
    }
    return false;
};
const deleteSectionByName = (name, sections) => {
    for (let i = 0; i < sections.length; i++) {
        if (sections[i].name === name) {
            sections.splice(i, 1);
            return true;
        }
        if (sections[i].children.length) {
            if (deleteSectionByName(name, sections[i].children)) return true;
        }
    }
    return false;
};

const createTreeItem = (section, parentList) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<i class="fas fa-angle-right"></i>${section.name}`;
    listItem.setAttribute('data-section-name', section.name);
    listItem.setAttribute('draggable', 'true');

    const detailsArea = document.querySelector('.details-area');
    const arrayInput = document.getElementById("array");
    const targetInput = document.getElementById("target");

    // Expand/Collapse Child Sections
    const icon = listItem.querySelector('.fas.fa-angle-right');

    icon.addEventListener('click', function (e) {
        e.stopPropagation(); // Prevent triggering parent listItem click event
        const childList = listItem.querySelector('.child-list');
        if (childList) {
            childList.style.display = childList.style.display === 'none' ? 'block' : 'none';
            this.classList.toggle('fa-angle-down');
            this.classList.toggle('fa-angle-right');
        }
    });

    //Click event for listItem (excluding icon click)
    listItem.addEventListener('click', function (event) {
        if (section.children.length === 0 && event.target !== icon && section.children.subname === 'binarysearch') {
            const arrayFromName = section.name.split(" ").map(Number);
            const targetFromDetails = 82; // hardcoded value

           arrayInput.value = section.name;
           targetInput.value = targetFromDetails.toString();
           binarySearch(arrayFromName, targetFromDetails);
           // linearSearch(arrayFromName, targetFromDetails);
       }
       else if(section.children.length === 0 && event.target !== icon ) {
        const arrayFromName = section.name.split(" ").map(Number);
        const targetFromDetails = 82; // hardcoded value

        arrayInput.value = section.name;
        targetInput.value = targetFromDetails.toString();

        linearSearch(arrayFromName, targetFromDetails);
    }
     });

    // listItem.addEventListener('click', function (event) {
    //     if (section.children.length === 0 && event.target !== icon ) {
    //         const arrayFromName = section.name.split(" ").map(Number);
    //         const targetFromDetails = 82; // hardcoded value

    //         arrayInput.value = section.name;
    //         targetInput.value = targetFromDetails.toString();

    //         linearSearch(arrayFromName, targetFromDetails);
    //     }
    // });

    // Toggle Button for details
    const toggleButton = document.createElement('button');
    toggleButton.innerHTML = '<i class="fas fa-eye"></i> Toggle Details';
    toggleButton.addEventListener('click', function (event) {
        detailsContainer.style.display = detailsContainer.style.display === 'none' ? 'block' : 'none';
        event.stopPropagation();
    });

    // Details container setup
    const detailsContainer = document.createElement('div');
    detailsContainer.innerHTML = `<div class="container">
        <div class="input">
            <label for="array">Enter an array of numbers:</label>
            <input type="text" id="array" placeholder="e.g., 3 1 4 1 5 9 2 6 5 3 5">
            <label for="target">Enter the target number to search for:</label>
            <input type="text" id="target" placeholder="e.g., 5">
            <button onclick="linearSearch()">Linear Search</button>
            <button onclick="binarySearch()">Binary Search</button>
        </div>
        <div class="visualization">
            <div id="array-container"></div>
            <p id="result"></p>
        </div>
    </div>`;
    detailsContainer.style.display = 'none';

    // Append toggle button and details container to the details area
    // const detailsArea = document.querySelector('.details-area');
    detailsArea.innerHTML = '';
    detailsArea.appendChild(toggleButton);
    detailsArea.appendChild(detailsContainer);

    // Drag event
    listItem.addEventListener('dragstart', function (e) {
        e.dataTransfer.setData('text/plain', listItem.getAttribute('data-section-name'));
    });

    // Handling the expand/collapse of child list
    listItem.querySelector('.fas.fa-angle-right').addEventListener('click', function () {
        const childList = listItem.querySelector('.child-list');
        if (childList) {
            childList.style.display = childList.style.display === 'none' ? 'block' : 'none';
            this.classList.toggle('fa-angle-down');
            this.classList.toggle('fa-angle-right');
        }
    });

    // Edit button
    const editBtn = document.createElement('span');
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editBtn.className = 'edit-btn';
    editBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        const currentSectionName = listItem.getAttribute('data-section-name');
        const newName = prompt('Enter new name:', currentSectionName);
        if (newName && newName !== currentSectionName) {
            updateSectionName(currentSectionName, newName, sections);
            populateSidebar();
        }
    });

    // Delete button
    const deleteBtn = document.createElement('span');
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        const currentSectionName = listItem.getAttribute('data-section-name');
        if (confirm(`Are you sure you want to delete ${currentSectionName}?`)) {
            deleteSectionByName(currentSectionName, sections);
            populateSidebar();
        }
    });

    // Add child button
    const addChildBtn = document.createElement('span');
    addChildBtn.innerHTML = '<i class="fas fa-plus"></i>';
    addChildBtn.className = 'add-child-btn';
    addChildBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        const currentSectionName = listItem.getAttribute('data-section-name');
        const section = findSectionByName(currentSectionName, sections);
        if (section) {
            const newChildName = prompt('Enter name for the new child section:');
            if (newChildName) {
                section.children.push({
                    name: newChildName,
                    details: `Details for ${newChildName}`,
                    children: []
                });
                populateSidebar();
            }
        }
    });

    listItem.appendChild(addChildBtn);
    listItem.appendChild(editBtn);
    listItem.appendChild(deleteBtn);
    parentList.appendChild(listItem);

    // Recursive creation of child nodes
    if (section.children && section.children.length) {
        const childList = document.createElement('ul');
        childList.className = 'child-list';
        listItem.appendChild(childList);
        section.children.forEach(childSection => createTreeItem(childSection, childList));
    }
}


const populateSidebar = () => {
    sidebarList.innerHTML = '';
    sections.forEach(section => createTreeItem(section, sidebarList));
};

document.addEventListener("DOMContentLoaded", function () {

    sidebarList.className = 'sidebar-list';
    populateSidebar();

    document.querySelector('.sidebar').appendChild(sidebarList);

    // FAB click event
    const fab = document.querySelector('.fab');
    let sectionCounter = 4;

    fab.addEventListener('click', function () {
        let newSectionName;
        if (deletedSectionsCounter > 0) {
            // Use the counter value before decrementing
            newSectionName = `Section ${sectionCounter - deletedSectionsCounter}`;
            deletedSectionsCounter--;
        } else {
            newSectionName = `Section ${sectionCounter}`;
            sectionCounter++;
        }

        const newSection = {
            name: newSectionName,
            details: `Details for ${newSectionName}`,
            children: []
        };

        sections.push(newSection); // Add the new section to the sections array

        populateSidebar();  // Repopulate to include new section
    });

    // Search bar functionality
    document.getElementById('search-bar').addEventListener('input', function () {
        const query = this.value.toLowerCase();
        const listItems = document.querySelectorAll('.sidebar-list li');
        listItems.forEach(item => {
            const sectionName = item.getAttribute('data-section-name').toLowerCase();
            item.style.display = sectionName.includes(query) ? 'block' : 'none';
        });
    });

    // Sidebar toggle
    document.getElementById('toggle-sidebar').addEventListener('click', function () {
        const sidebar = document.querySelector('.sidebar');
        sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';
    });
});

// ... Rest of your JavaScript code ...



// main.js

// ... Existing JavaScript code ...

// Function to save sidebar state
const saveSidebarState = (isCollapsed) => {
    localStorage.setItem('sidebarState', isCollapsed ? 'collapsed' : 'expanded');
};

// Function to load sidebar state
const loadSidebarState = () => {
    return localStorage.getItem('sidebarState');
};

// Function to handle sidebar state
const handleSidebarState = (isCollapsed) => {
    if (isCollapsed) {
        sidebarElement.classList.add('collapsed');
        expandButton.style.display = 'block'; // Show the expand button
    } else {
        sidebarElement.classList.remove('collapsed');
        expandButton.style.display = 'none'; // Hide the expand button
    }
};

// const sidebarElement = document.querySelector('.sidebar');
const collapseButton = document.getElementById('collapse-sidebar');
const expandButton = document.getElementById('expand-sidebar');

// Load saved state from local storage
const savedState = loadSidebarState();
handleSidebarState(savedState === 'collapsed');

// Update the collapse button click event
collapseButton.addEventListener('click', function () {
    const isCollapsed = sidebarElement.classList.contains('collapsed');
    saveSidebarState(!isCollapsed);
    handleSidebarState(!isCollapsed);
});

// Add click event for the expand button
expandButton.addEventListener('click', function () {
    saveSidebarState(false);
    handleSidebarState(false);
});

// ... Rest of the JavaScript code ...



// ... Existing JavaScript code ...

// Helper function to find the parent of a section
const findParentOfSection = (name, sections, parent = null) => {
    for (let section of sections) {
        if (section.name === name) return parent;
        if (section.children.length) {
            const foundParent = findParentOfSection(name, section.children, section);
            if (foundParent) return foundParent;
        }
    }
    return null;
};

const rearrangeSections = (draggedSectionName, targetSectionName) => {
    const draggedSection = findSectionByName(draggedSectionName, sections);
    const draggedSectionParent = findParentOfSection(draggedSectionName, sections);
    const targetSectionParent = findParentOfSection(targetSectionName, sections);

    const parentArray = draggedSectionParent ? draggedSectionParent.children : sections;
    const targetArray = targetSectionParent ? targetSectionParent.children : sections;

    // Remove the dragged section from its original location
    parentArray.splice(parentArray.indexOf(draggedSection), 1);

    // Insert it before the target section
    targetArray.splice(targetArray.indexOf(findSectionByName(targetSectionName, sections)), 0, draggedSection);

    populateSidebar();
};


// Add dragover event
sidebarList.addEventListener('dragover', function (e) {
    e.preventDefault();
});

// Add drop event
sidebarList.addEventListener('drop', function (e) {
    e.preventDefault();

    const draggedSectionName = e.dataTransfer.getData('text/plain');
    const target = e.target.closest('li');

    console.log('Dropped on:', target.getAttribute('data-section-name')); // Add this line

    if (target && target.getAttribute('data-section-name') !== draggedSectionName) {
        rearrangeSections(draggedSectionName, target.getAttribute('data-section-name'));
    }
});

// ... Rest of the JavaScript code ...
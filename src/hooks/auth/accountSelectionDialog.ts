/**
 * Function to show browser account selection dialog
 * @returns Promise that resolves to the selected account or null if canceled
 */
export const showBrowserAccountSelectionDialog = (): Promise<{ email: string; name: string; photoURL: string } | null> => {
  return new Promise((resolve) => {
    // Try to use the browser's credential management API if available
    if (window.navigator && window.navigator.credentials) {
      navigator.credentials.get({
        mediation: 'optional'
      }).then((credential) => {
        if (credential && 'id' in credential) {
          // Use the credential information
          const email = credential.id;
          const name = email.split('@')[0].replace(/\./g, ' ').replace(/\b\w/g, l => l.toUpperCase());
          resolve({
            email,
            name,
            photoURL: `https://ui-avatars.com/api/?name=${name.replace(/ /g, '+')}&background=4285F4&color=fff`
          });
        } else {
          // If no credential is selected, fallback to our custom dialog
          showCustomDialog(resolve);
        }
      }).catch(() => {
        // If Credential Management API fails, use our custom dialog
        showCustomDialog(resolve);
      });
    } else {
      // Fallback for browsers that don't support Credential Management API
      showCustomDialog(resolve);
    }
  });
};

// Custom dialog fallback function
const showCustomDialog = (resolve: (value: { email: string; name: string; photoURL: string } | null) => void) => {
  // Create a dialog to simulate browser account selection
  const dialog = document.createElement('div');
  dialog.className = 'fixed inset-0 flex items-center justify-center bg-black/50 z-50';
  dialog.innerHTML = `
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
      <h2 class="text-xl font-bold mb-4 dark:text-white">Choose an account</h2>
      <p class="text-gray-500 dark:text-gray-400 mb-4">to continue to ArgoMind</p>
      <div class="space-y-2" id="accounts-container">
        <div class="animate-pulse flex items-center p-3">
          <div class="rounded-full bg-gray-200 dark:bg-gray-700 h-8 w-8 mr-3"></div>
          <div class="flex-1 space-y-2">
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      </div>
      <button id="cancel-button" class="mt-4 w-full text-center p-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">Cancel</button>
    </div>
  `;
  document.body.appendChild(dialog);
  
  // Try to retrieve saved emails from localStorage
  const savedEmails = JSON.parse(localStorage.getItem('recentEmails') || '[]');
  const accountsContainer = dialog.querySelector('#accounts-container');
  
  // If we have saved emails, use them
  if (savedEmails.length > 0 && accountsContainer) {
    accountsContainer.innerHTML = '';
    savedEmails.forEach((email: string) => {
      const name = email.split('@')[0].replace(/\./g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      const accountOption = document.createElement('button');
      accountOption.className = 'account-option w-full flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded';
      accountOption.innerHTML = `
        <img src="https://ui-avatars.com/api/?name=${name.replace(/ /g, '+')}&background=4285F4&color=fff" class="w-8 h-8 rounded-full mr-3" />
        <div class="text-left">
          <div class="font-medium dark:text-white">${name}</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">${email}</div>
        </div>
      `;
      accountOption.addEventListener('click', () => {
        document.body.removeChild(dialog);
        resolve({
          email,
          name,
          photoURL: `https://ui-avatars.com/api/?name=${name.replace(/ /g, '+')}&background=4285F4&color=fff`
        });
      });
      accountsContainer.appendChild(accountOption);
    });
  } else if (accountsContainer) {
    // If no saved emails, show add account option
    accountsContainer.innerHTML = `
      <button class="account-option w-full flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
        <div class="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="text-left">
          <div class="font-medium text-blue-600">Add a Google Account</div>
        </div>
      </button>
    `;
    
    const addAccountButton = accountsContainer.querySelector('.account-option');
    if (addAccountButton) {
      addAccountButton.addEventListener('click', () => {
        document.body.removeChild(dialog);
        // Prompt for email input
        const email = prompt('Enter your Google email:');
        if (email) {
          const name = email.split('@')[0].replace(/\./g, ' ').replace(/\b\w/g, l => l.toUpperCase());
          
          // Save email to localStorage for future use
          const savedEmails = JSON.parse(localStorage.getItem('recentEmails') || '[]');
          if (!savedEmails.includes(email)) {
            savedEmails.push(email);
            localStorage.setItem('recentEmails', JSON.stringify(savedEmails));
          }
          
          resolve({
            email,
            name,
            photoURL: `https://ui-avatars.com/api/?name=${name.replace(/ /g, '+')}&background=4285F4&color=fff`
          });
        } else {
          resolve(null);
        }
      });
    }
  }
  
  // Add another account option
  const addAnotherAccountOption = document.createElement('button');
  addAnotherAccountOption.className = 'account-option w-full flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded mt-2';
  addAnotherAccountOption.innerHTML = `
    <div class="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 mr-3">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
      </svg>
    </div>
    <div class="text-left">
      <div class="font-medium text-blue-600">Use another account</div>
    </div>
  `;
  addAnotherAccountOption.addEventListener('click', () => {
    document.body.removeChild(dialog);
    // Prompt for email input
    const email = prompt('Enter your Google email:');
    if (email) {
      const name = email.split('@')[0].replace(/\./g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      
      // Save email to localStorage for future use
      const savedEmails = JSON.parse(localStorage.getItem('recentEmails') || '[]');
      if (!savedEmails.includes(email)) {
        savedEmails.push(email);
        localStorage.setItem('recentEmails', JSON.stringify(savedEmails));
      }
      
      resolve({
        email,
        name,
        photoURL: `https://ui-avatars.com/api/?name=${name.replace(/ /g, '+')}&background=4285F4&color=fff`
      });
    } else {
      resolve(null);
    }
  });
  accountsContainer?.appendChild(addAnotherAccountOption);
  
  const cancelButton = dialog.querySelector('#cancel-button');
  cancelButton?.addEventListener('click', () => {
    document.body.removeChild(dialog);
    resolve(null);
  });
  
  // Allow clicking outside to cancel
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) {
      document.body.removeChild(dialog);
      resolve(null);
    }
  });
};

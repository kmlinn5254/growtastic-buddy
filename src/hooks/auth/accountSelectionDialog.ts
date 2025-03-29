
/**
 * Function to show browser account selection dialog
 * @returns Promise that resolves to the selected account or null if canceled
 */
export const showBrowserAccountSelectionDialog = (): Promise<{ email: string; name: string; photoURL: string } | null> => {
  return new Promise((resolve) => {
    // Create a dialog to simulate browser account selection
    const dialog = document.createElement('div');
    dialog.className = 'fixed inset-0 flex items-center justify-center bg-black/50 z-50';
    dialog.innerHTML = `
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 class="text-xl font-bold mb-4 dark:text-white">Choose an account</h2>
        <p class="text-gray-500 dark:text-gray-400 mb-4">to continue to ArgoMind</p>
        <div class="space-y-2">
          <button class="account-option w-full flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <img src="https://ui-avatars.com/api/?name=Current+User&background=0D8ABC&color=fff" class="w-8 h-8 rounded-full mr-3" />
            <div class="text-left">
              <div class="font-medium dark:text-white">Current User</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">user@gmail.com</div>
            </div>
          </button>
          <button class="account-option w-full flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <img src="https://ui-avatars.com/api/?name=Work+Account&background=4285F4&color=fff" class="w-8 h-8 rounded-full mr-3" />
            <div class="text-left">
              <div class="font-medium dark:text-white">Work Account</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">work@company.com</div>
            </div>
          </button>
          <button class="account-option w-full flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <div class="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="text-left">
              <div class="font-medium text-blue-600">Use another account</div>
            </div>
          </button>
        </div>
        <button id="cancel-button" class="mt-4 w-full text-center p-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">Cancel</button>
      </div>
    `;
    document.body.appendChild(dialog);
    
    // Handle account selection
    const accountOptions = dialog.querySelectorAll('.account-option');
    const cancelButton = dialog.querySelector('#cancel-button');
    
    accountOptions.forEach((option, index) => {
      option.addEventListener('click', () => {
        document.body.removeChild(dialog);
        if (index === 0) {
          resolve({
            email: 'user@gmail.com',
            name: 'Current User',
            photoURL: 'https://ui-avatars.com/api/?name=Current+User&background=0D8ABC&color=fff'
          });
        } else if (index === 1) {
          resolve({
            email: 'work@company.com',
            name: 'Work Account',
            photoURL: 'https://ui-avatars.com/api/?name=Work+Account&background=4285F4&color=fff'
          });
        } else {
          // "Use another account" - would typically open the Google OAuth flow
          // For mock purposes, we'll just use a different account
          resolve({
            email: 'new@example.com',
            name: 'New Account',
            photoURL: 'https://ui-avatars.com/api/?name=New+Account&background=34A853&color=fff'
          });
        }
      });
    });
    
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
  });
};

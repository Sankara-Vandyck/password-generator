<template>
  <div>
    <h2 class="passwordGenerator">Password Generator</h2>
    <div class="flex items-center">
      <label for="passwordLength">Password Length: {{ passwordLength }}</label>
    </div>
      <div class="slider-container">
        <input
          type="range"
          id="passwordLength"
          v-model="passwordLength"
          min="8"
          max="15"
          step="1"
        />
      
   
    </div>
    <div>
      <label for="uppercase">Include Uppercase Letters:</label>
      <input type="checkbox" id="uppercase" v-model="includeUppercase" />
    </div>
      <div>
      <label for="numbers">Include Numbers:</label>
      <input type="checkbox" id="numbers" v-model="includeNumbers" />
    </div>
    <div>
      <label for="symbols">Include Symbols:</label>
      <input type="checkbox" id="symbols" v-model="includeSymbols" />
    </div>
    <button @click="generatePassword">Generate Password</button>
    <div>
      <p v-if="generatedPassword">Generated Password:</p>
      <p>{{ generatedPassword }}</p>
    </div>
    <div>
      <h3>Password History</h3>
      <ul>
        <li v-for="(password, index) in passwordHistory" :key="index">
          {{ password }}
          <button @click="copyToClipboard(password)">Copy</button>
        </li>
      </ul>
    </div>
    <button @click="clearHistory">Clear History</button>
  </div>

</template>

<script>
export default {
  data() {
    return {
      copySuccessMessage: '',
      passwordLength: 12,
      includeUppercase: true,
      includeNumbers: true,
      includeSymbols: true,
      generatedPassword: null,
      passwordHistory: [],
      minLength: 8,
      maxLength: 15,
      scrollLineWidth: '0%',
    };
  },
  methods: {
    clearHistory() {
      this.passwordHistory = [];
    },
    updateScrollLine() {
      // Calculate the scroll line width based on the input value
      const min = 8;
      const max = 15;
      const widthPercentage = ((this.passwordLength - min) / (max - min)) * 100;
      this.scrollLineWidth = `${widthPercentage}%`;
    },

    generatePassword() {
      const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
      const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const numberChars = '0123456789';
      const symbolChars = '!@#$%^&*()_-+=<>?/{}[]|';

      let chars = lowercaseChars;
      if (this.includeUppercase) chars += uppercaseChars;
      if (this.includeNumbers) chars += numberChars;
      if (this.includeSymbols) chars += symbolChars;

      let password = '';

      const passwordLength = Math.floor(
        Math.random() * (this.maxLength - this.minLength + 1) + this.minLength
      );

      for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
      }

      this.generatedPassword = password;

      this.passwordHistory.push(this.generatedPassword);

      if (this.passwordHistory.length > 10) {
        this.passwordHistory.shift();
      }

      this.copyToClipboard(password);
    },

    copyToClipboard(password) {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = password;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        // Set the copy success message
        this.copySuccessMessage = 'Password copied to clipboard!';

        // Clear the message after a few seconds (optional)
        setTimeout(() => {
          this.copySuccessMessage = '';
        }, 3000);
      } catch (error) {
        // Handle any errors that may occur during copy
        console.error('Unable to copy to clipboard', error);
      }
    },
  },
};
</script>

<style>
.passwordGenerator{
  color: var(--Aureolin, #00bef8);
  width: 588px;
font-family: Tomorrow;
font-size: 40px;
font-style: normal;
font-weight: 700;
line-height: 40px; 
letter-spacing: 8px;
text-transform: uppercase;
}

.copy-success-message {
  color: green; /* Adjust the color as needed */
  font-weight: bold;
  margin-top: 10px;
}

/* Style for the slider container */
.slider-container {
  width: 100%;
  margin-left: 10px; 
}

/* Style for the slider track and thumb */
input[type="range"] {
  width: 500px;
  -webkit-appearance: none;
  appearance: none;
  height: 6px; 
  background: #d3d3d3; 
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

/* Style for the slider thumb (handle) */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px; 
  height: 20px;
  background: #007BFF; 
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  width: 20px; 
  height: 20px; 
  background: #007BFF; 
  cursor: pointer;
}

/* Style for the slider thumb (handle) when hovered */
input[type="range"]:hover::-webkit-slider-thumb {
  opacity: 1;
}

input[type="range"]:hover::-moz-range-thumb {
  opacity: 1;
}

</style>

import React, { useState, useRef } from 'react';

const PasswordGenerator = () => {
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');

  const passwordInputRef = useRef(null);

  const handleGeneratePassword = () => {
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';
    
    let characters = lowerCaseChars + upperCaseChars;
    if (includeNumbers) characters += numbers;
    if (includeSpecialChars) characters += specialChars;

    let password = '';
    for (let i = 0; i < passwordLength; i++) {
      const randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
      password += randomChar;
    }

    setGeneratedPassword(password);
  };

  const handleCopyPassword = () => {
    if (passwordInputRef.current) {
      passwordInputRef.current.select();
      document.execCommand('copy'); 
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-700">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Password Generator</h1>
        
        <div className="flex items-center space-x-2">
          <input
            type="text"
            readOnly
            value={generatedPassword}
            ref={passwordInputRef} 
            className="flex-1 p-3 border border-gray-300 rounded-md"
            placeholder="Generated Password"
          />
          <button
            onClick={handleCopyPassword}
            className="bg-blue-500 text-white p-3 rounded-md"
          >
            Copy
          </button>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Password Length</label>
          <input
            type="range"
            min="8"
            max="20"
            value={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
            className="w-full mt-2"
          />
          <p className="text-center">{passwordLength} characters</p>
        </div>

        <div className="mt-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
              className="h-5 w-5 text-blue-500"
            />
            <label className="text-sm text-gray-700">Include Numbers</label>
          </div>

          <div className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              checked={includeSpecialChars}
              onChange={() => setIncludeSpecialChars(!includeSpecialChars)}
              className="h-5 w-5 text-blue-500"
            />
            <label className="text-sm text-gray-700">Include Special Characters</label>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleGeneratePassword}
            className="w-full py-3 bg-blue-500 text-white rounded-md"
          >
            Generate Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;

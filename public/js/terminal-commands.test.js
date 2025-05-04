import { getCommandSuggestions, handleCommandError } from './terminal-commands.js';

describe('Command Suggestions', () => {
  const commandsObj = {
    help: () => {},
    clear: () => {},
    about: () => {},
    projects: () => {},
    contact: () => {},
    ls: () => {},
    cd: () => {},
    cat: () => {},
    echo: () => {},
    neofetch: () => {},
    exit: () => {},
  };

  test('suggests correct command for typo', () => {
    const suggestions = getCommandSuggestions('lss', commandsObj);
    expect(suggestions[0].command).toBe('ls');
  });

  test('handleCommandError returns did you mean', () => {
    const msg = handleCommandError('lss', commandsObj);
    expect(msg).toMatch(/Did you mean: ls/);
  });

  test('returns no suggestions for unknown command', () => {
    const msg = handleCommandError('foobar', commandsObj);
    expect(msg).toMatch(/Command not found: foobar/);
    expect(msg).toMatch(/Type 'help'/);
  });
}); 
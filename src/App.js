import React from 'react';
import './App.css';

const initialDreams = [
    {content: 'Become a pilot', fulfilled: 0},
    {content: 'Open a restaurant', fulfilled: 0},
    {content: 'Learn Italian', fulfilled: 0}
];

class Dreams extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dreams: [],
            newDream: ''
        };

        this.dreamInput = React.createRef();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearDreams = this.clearDreams.bind(this);
        this.resetDreams = this.resetDreams.bind(this);
        this.sortDreams = this.sortDreams.bind(this);
        this.toggleDream = this.toggleDream.bind(this);
        this.deleteDream = this.deleteDream.bind(this);
    }

    componentDidMount() {
        this.dreamInput.current.focus();
        this.resetDreams();
    }

    handleChange(event) {
        this.setState({newDream: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.newDream.trim()) {
            this.setState((state) => ({dreams: [...state.dreams, {content: this.state.newDream, fulfilled: 0}]}), () => {this.sortDreams()});
            this.setState({newDream: ''});
        }

        this.dreamInput.current.focus();
    }

    clearDreams() {
        this.setState({dreams: []});
    }

    resetDreams() {
        this.setState({dreams: initialDreams}, () => {this.sortDreams()});
    }

    sortDreams() {
        this.setState((state) => ({dreams: state.dreams.sort((a, b) => (a.fulfilled > b.fulfilled) ? 1 : (a.fulfilled === b.fulfilled) ? ((a.content.toLowerCase() > b.content.toLowerCase()) ? 1 : -1) : -1)}));
    }

    toggleDream(index) {
        this.setState((state) => ({
            dreams: state.dreams.map((dream, j) => {
                if (j === index) {
                    return {content: dream.content, fulfilled: (dream.fulfilled === 1) ? 0 : 1};
                } else {
                    return dream;
                }
            })
        }), () => {this.sortDreams()});
    }

    deleteDream(index) {
        this.setState((state) => ({
            dreams: state.dreams.filter((dream, j) => j !== index)
        }));
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.newDream} onChange={this.handleChange} ref={this.dreamInput} /><br />
                    <input type="submit" value="Submit Dream" />
                </form>
                {this.state.dreams.length === 0 &&
                    <p>There are no dreams yet! <span role="img" aria-label="jsx-a11y/accessible-emoji">🥺</span></p>
                }
                {this.state.dreams.length > 0 &&
                    <ul>
                        {this.state.dreams.map((dream, index) =>
                            <li key={index}>
                                {dream.fulfilled === 0 &&
                                    <div className="emoji-buttons">
                                        <span className="emoji-button" onClick={() => this.toggleDream(index)} title="Mark as fulfilled" role="img" aria-label="jsx-a11y/accessible-emoji">✅</span>
                                        <span className="emoji-button" onClick={() => this.deleteDream(index)} title="Delete" role="img" aria-label="jsx-a11y/accessible-emoji">❌</span>
                                    </div>
                                }
                                {dream.fulfilled === 1 &&
                                    <div className="emoji-buttons">
                                        <span className="emoji" onClick={() => this.toggleDream(index)} title="Unmark as fulfilled" role="img" aria-label="jsx-a11y/accessible-emoji">💭</span>
                                    </div>
                                }
                                <span className={(dream.fulfilled === 1) ? 'fulfilled' : ''}>{dream.content}</span>
                            </li>
                        )}
                    </ul>
                }
                <div className="footer-buttons">
                    <input type="button" value="Delete Dreams" onClick={this.clearDreams} />
                    <input type="button" value="Reset App" onClick={this.resetDreams} />
                </div>
            </div>
        );
    }
}

function App() {
  return (
    <div className="App">
        <h1>React Dreams <span role="img" aria-label="jsx-a11y/accessible-emoji">😊💭✨</span></h1>
        <p className="b">Oh hi!</p>
        <p>Tell me your hopes and dreams&hellip;</p>

        <Dreams />
    </div>
  );
}

export default App;

function Header(){
    return (
        <div className = "header">
            <h1> Essay Feedback Tool v.1.1</h1>
            <h2>Current Features</h2>
            <ul>
                <li>Passive-voice detection (i.e. "is written")</li>
                <li>No 2 sentences start with the same word</li>
                <li>Repetitive sentence opening structure</li>
                <li>Repetitive words in context</li>
            </ul>
            <p>Paste your essay below to get feedback</p>
        </div>
    )
}

export default Header;
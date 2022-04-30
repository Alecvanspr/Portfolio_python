function GetFooter(){
    return (
        <footer>
            <small>Copyright enzo</small> 
        </footer> 
    )
}
function GetHeader(){
    return (
        <header>
            <nav className="MenuBalk">
                <img src = "/static/img/demo_logo.png" />
                    <ul className="MenuItems">
                        <li>Pricing</li>
                        <li>About</li>
                        <li>Contact</li> 
                    </ul>
            </nav> 
        </header>
    )
}

function GetList(){
    return (
        <div>
        <h1>Waarom wil ik react leren</h1>
        <ol>
            <li>Het is voor mijn stage</li>
            <li>ik heb niks beters te doen</li>
            <li>zelfontplooing</li>
        </ol>
    </div> 
    )
}

function Page(){
    return (
        <div>
            <GetHeader />
            <GetList />
            <GetFooter />
        </div> 
    )
}

ReactDOM.render(<Page />, document.getElementById("root"))
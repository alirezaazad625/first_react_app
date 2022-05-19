import {useNavigate} from "react-router-dom";

export default () => {
    const userInfo = localStorage.getItem("access_token");
    const navigator = useNavigate()
    return (
        <>
            {userInfo &&
            <div className={"nav"} style={{"height": "100vh", "margin": "0", "width": "20vh"}}>
                {/*<h2 style={{"padding": "20px"}}>*/}
                {/*    سامانه دسترسی*/}
                {/*</h2>*/}
                <nav>
                    <div className="link" onClick={() => navigator("/users")}>
                        <div>
                            کاربران
                        </div>
                    </div>
                    <div className="link" onClick={() => navigator("/roles")}>
                        <div>
                            نقش ها
                        </div>
                    </div>
                    <div className="link" onClick={() => {
                        localStorage.removeItem("access_token");
                        navigator("/login")
                    }}>
                        <div>
                            خروج
                        </div>
                    </div>
                </nav>
            </div>
            }
        </>
    );
}
import {useNavigate} from "react-router-dom";
import {getAccessToken, removeAccessToken} from "../storage/AccessToken";

export default () => {
    const userInfo = getAccessToken();
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
                        removeAccessToken();
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
import {useNavigate} from "react-router-dom";
import {getAccessToken, hasRole, removeAccessToken} from "../storage/AccessToken";

export default () => {
    const userInfo = getAccessToken();
    const navigator = useNavigate()
    return (
        <>
            {userInfo &&
            <div className={"nav"} style={{"height": "100vh", "margin": "0", "width": "20vh"}}>
                <nav>
                    <div className="link" onClick={() => navigator("/users")}>
                        <div>
                            کاربران
                        </div>
                    </div>
                    {hasRole('ROLE_CREATE_ROLE') &&  <div className="link" onClick={() => navigator("/roles")}>
                        <div>
                            نقش ها
                        </div>
                    </div>
                    }
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
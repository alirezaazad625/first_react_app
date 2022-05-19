import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default () => {
    const navigator = useNavigate();
    useEffect(() => {
        navigator("/login")
    }, []);
    return null;
}
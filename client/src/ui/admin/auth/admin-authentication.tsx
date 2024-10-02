import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import Login from "./login"
import { Signup } from "./signup"
import { useState } from "react"
export const AdminAuthentication = () => {
    const [isLogin, setIsLogin] = useState(true);
    const activeTab = isLogin ? 'login' : 'signup';
    return (
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={() => setIsLogin(!isLogin)} className="w-[400px]">
            <TabsList className="w-full">
                <TabsTrigger value="login" className="w-full">Login</TabsTrigger>
                <TabsTrigger value="signup" className="w-full">Signup</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <Login onSwitchToSignup={() => setIsLogin(false)} />
            </TabsContent>
            <TabsContent value="signup">
                <Signup onSwitchToLogin={() => setIsLogin(true)} />
            </TabsContent>

        </Tabs>
    )
} 

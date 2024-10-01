import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import Login from "./login"

export const AdminAuthentication = () => {
    return (
        <Tabs defaultValue="login" className="w-[400px]">
            <TabsList className="w-full">
                <TabsTrigger value="login" className="w-full">Login</TabsTrigger>
                <TabsTrigger value="signup" className="w-full">Signup</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <Login />
            </TabsContent>
            <TabsContent value="signup">
signup
            </TabsContent>
        </Tabs>
    )
} 

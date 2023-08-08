import NavigationBar from '../molecules/NavigationBar';
import CollectibleDisplay from '../molecules/CollectibleDisplay';
import CollectibleUpload from '../molecules/CollectibleUpload';
import { TimeProvider } from '../molecules/TimeContext'



export default function Collectibles(){
    return(
        <>
            <TimeProvider><NavigationBar showLogoutButton={true}/></TimeProvider>
    <CollectibleUpload />
    <CollectibleDisplay />
        </>

    );

}
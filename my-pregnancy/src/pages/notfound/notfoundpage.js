import Footer from "../../global-components/footer/footer";

function NotFoundPage(){
    return (
        <div>
            <div style={{minHeight: 'calc(100vh - 202px)'}}>
                <h1>404 not found</h1>
            </div>
            
            <Footer></Footer>
        </div>
    );
}

export default NotFoundPage;
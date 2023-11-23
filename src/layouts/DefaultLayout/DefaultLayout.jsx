import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

// eslint-disable-next-line react/prop-types
function DefaultLayout({ children }) {
    return (
        <div>
            <Header />

            <div>{children}</div>

            <Footer />
        </div>
    );
}

export default DefaultLayout;

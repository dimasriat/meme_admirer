import '../styles/tailwind.min.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  
  return <Component {...pageProps} />
}

// MyApp.getInitialProps = async (ctx) => {
// 	const res = await axios("/api/get-donatur");
// 	const donatur = res.data;
// 	return { donatur: donatur };
// };


export default MyApp

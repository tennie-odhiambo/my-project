const Footer = () => {
    return (
        <footer className="bg-gray-800 text-primary py-4">
        <div className="container mx-auto text-center">
            <p>&copy; 2025 Book Library. All rights reserved.</p>
            <p>
            Follow me on{' '}
            <a href="https://twitter.com" className="text-white hover:underline">
                Twitter
            </a>{' '}
            and{' '}
            <a href="https://facebook.com" className="text-white hover:underline">
                Facebook
            </a>
            </p>
        </div>
        </footer>
    );
    }

export default Footer;
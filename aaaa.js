import React from 'react';

export default class MyDocument extends Document {
    static async getInitialProps({ renderPage }) {
        const page = renderPage();
    }
}

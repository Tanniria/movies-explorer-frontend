import "./PageNotFound.css";

export default function PageNotFound() {
    return (
        <main>
            <section className="pageNotFound">
                <div className="pageNotFound__container">
                    <div className="pageNotFound__text">
                        <h2 className="pageNotFound__title">404</h2>
                        <h3 className="pageNotFound__subtitle">Страница не найдена</h3>
                    </div>
                    <button className="pageNotFound__button">Назад</button>
                </div>
            </section>
        </main>

    );
};
import { Provider } from "react-redux";
import { store } from "redux/store";
import Index from "routes";

const App = () => {
  return (
    <div className="font-gothic bg-mainBackground bg-cover bg-no-repeat bg-top">
      <Provider store={store}>
        <Index />
      </Provider>
    </div>
  );
};
export default App;

import { Provider } from "react-redux";
import { store } from "redux/store";
import Index from "routes";

const App = () => {
  return (
    <div className="font-gothic">
      <Provider store={store}>
        <Index />
      </Provider>
    </div>
  );
};
export default App;

// axios
import axios from "src/utils/axios";
import AxiosMockAdapter from "axios-mock-adapter";

// ----------------------------------------------------------------------

const axiosMockAdapter = new AxiosMockAdapter(axios, {
  delayResponse: 0
});

export default axiosMockAdapter;

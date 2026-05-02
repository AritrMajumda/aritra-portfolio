import fs from 'fs';

function replaceAll(str, find, replace) {
  return str.split(find).join(replace);
}

let c = fs.readFileSync('work/index.html', 'utf8');

const archOldText = 'Histories of architecture often operate with concepts of “authorship” and “influence,” centring the figure of the architect and the creative aspects of architectural work. In contrast, this group will explore contemporary approaches to architectural labour as a lens to craft more relational accounts of architectural practice that are perceptive to collaborative and routine aspects of design, as well as the material production and maintenance of buildings. The workshop is interested in reflecting upon the synchronic and diachronic relationships between architectural workers and other co-producers of historical and contemporary built environments — draughtsman, construction workers, engineers, and urban residents. By attending to relationships, in the words of Peggy Deamer, between “intention and execution, thinking and making, opportunity and liability, and innovation and responsibility,” (Deamer 2010) workshop participants will develop more situated portraits of architectural practice based on archival research, oral history, and/or secondary literature analysis.';

const archNewText = 'The AI Trading Suite is a comprehensive algorithmic trading system designed for high-frequency trading (HFT) and quantitative research. It leverages statistical methods and machine learning models to analyze market microstructure and order book dynamics. The system features a robust data pipeline capable of preprocessing and validating decades of historical L1 tick data, facilitating extensive backtesting across tens of thousands of market scenarios to optimize strategy parameters and maximize risk-adjusted returns.';

c = replaceAll(c, archOldText, archNewText);

const movingOldText = 'How might we write histories of architecture and urbanism that account for transience and movement in the construction and maintenance of the built environment? Through collective readings, discussions, invited lectures, and participants’ own writing practice, this interdisciplinary seminar offers a space to explore this question. Together, we will engage with a growing body of scholarship that rethinks modern architectural history—both within and beyond Europe—through the lenses of mobility, mediation, and material flows. These approaches contribute to an expanding historiographical project that decentres permanence and fixity, foregrounding instead the fluid, temporal, and logistical dimensions of the built environment. Rather than focusing on monumentality or singular authorship, we will consider architecture through its mobilities: of technologies, materials, media, and spatial practices in flux.';

const movingNewText = 'Nexus-DS represents a paradigm shift in autonomous data science. By integrating a Golang control layer with a LangGraph reasoning layer, it orchestrates specialized AI agents to handle discovery, classification, and complex causal modeling. The system employs human-in-the-loop checkpoints and a rigorous refutation audit protocol to ensure scientific validity and reliability in its automated workflows.';

c = replaceAll(c, movingOldText, movingNewText);

const movingOldFull = 'The seminar is structured around three intersecting scales of “moving architectures.” First, we will explore portable buildings—structures designed to be relocated, disassembled, or reassembled—such as those found in colonial, military, or disaster contexts. Second, we will turn to material entanglements, focusing on the histories of resource flows, and the transient urbanisms that emerge in and around sites of extraction. Third, we will examine foundation structures and technologies for building on unstable terrain, particularly on and with permafrost, considering how architecture interacts with the ground through processes of shifting, stabilizing, and engineering substructures, while also exploring the political and technical histories of rheology. In doing so, we begin to grasp, in the words of Tim Anstey, the “double condition of architecture, as simultaneously a construction of material and of the mediated” (Anstey 2024, 19). The course is open to anyone interested in the history and theory of architecture, spatial politics, or related fields.';

const movingNewFull = 'The platform architecture is built for scale and security. It utilizes Docker and gVisor for sandboxed execution of AI-generated code, preventing unauthorized system access while allowing complex data manipulations. The reasoning layer leverages stateful graphs via LangGraph and Redis to manage memory across the swarm of agents. For scientific computation, it integrates high-performance libraries like Polars, DoWhy, and EconML, making it capable of executing end-to-end causal inference pipelines autonomously.';

c = replaceAll(c, movingOldFull, movingNewFull);

fs.writeFileSync('work/index.html', c);
console.log('Work page modals personalized!');

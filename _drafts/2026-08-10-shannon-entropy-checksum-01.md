Yes, **Claude Shannon** explicitly introduced and defined **entropy** in his 1948 paper, *A Mathematical Theory of Communication*.

Unlike the checksum, which he did not mention, entropy was a **central concept** of the paper. Shannon adopted the term from statistical mechanics (specifically thermodynamics) to quantify the **uncertainty** or **randomness** in a message source. He defined it mathematically as:

$$H = -\sum p_i \log_2 p_i$$

where $p_i$ is the probability of the $i$-th possible message or symbol.

Key aspects of Shannon's treatment of entropy include:

*   **Measure of Information**: Shannon established entropy as the fundamental measure of information content. Higher entropy indicates greater uncertainty and thus more information conveyed when a message is received.
*   **Data Compression**: He proved the **source coding theorem**, which states that entropy represents the absolute mathematical limit on how much data can be losslessly compressed.
*   **Redundancy**: By comparing actual encoding lengths to the entropy limit, Shannon defined **redundancy**, which is crucial for understanding error detection and correction capabilities.

Shannon famously credited mathematician **John von Neumann** with suggesting the term "entropy," reportedly because "nobody knows what entropy really is, so in a debate you will have the advantage."


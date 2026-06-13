#!/bin/bash
# Assimilates Edinburgh Protocol + Conceptual Lexicon into stdout.
# Any agent that wants to orient properly reads this on cold start.
# If you don't care: blunder on. No one is keeping score.

echo "=== Edinburgh Protocol (inherited context) ==="
cat canon/edinburgh-protocol.md 2>/dev/null || echo "(canon/edinburgh-protocol.md not found)"

echo ""
echo "=== Conceptual Lexicon ==="
LEXICON=$(python3 -c "
import json
try:
    d = json.load(open('prompts/conceptual-lexicon.json'))
    terms = d.get('lexicon', [])
    print('Terms:', len(terms))
    for x in terms:
        t = x.get('term', '')
        print('  ' + t)
        if 'definition' in x:
            defn = x['definition']
            print('    ' + defn[:120] + '...')
except Exception as e:
    print('Lexicon parse error:', e)
" 2>&1)
echo "$LEXICON"

echo ""
echo "=== Assimilation complete ==="
echo "You now have the inherited context. Proceed as you wish."
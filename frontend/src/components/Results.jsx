function FeedbackSection({ title, emptyMessage, children, isEmpty }) {
  return (
    <section className="result-card">
      <h3>{title}</h3>
      {isEmpty ? <p className="quiet">{emptyMessage}</p> : children}
    </section>
  );
}

const openingCategoryLabels = {
  subordinatingStart: "Subordinating clause",
  pronounStart: "Pronoun",
  nounPhraseStart: "Noun phrase",
  adverbStart: "Adverb",
  bareNounStart: "Bare noun",
  otherStart: "Other",
};

function formatOpeningCategory(category) {
  return openingCategoryLabels[category] ?? category;
}

function Results({ result }) {
  if (!result) return null;

  const repeatedStarters = Object.entries(result.repeated_starters);
  const openingRepetitions = result.opening_repetitions.consecutive;
  const overusedOpenings = result.opening_repetitions.overused;

  return (
    <section className="results" aria-live="polite">
      <div className="results-heading">
        <div>
          <h2>Draft overview</h2>
        </div>
        <p>{result.summary.word_count} words · {result.summary.sentence_count} sentences</p>
      </div>

      <div className="result-grid">
        <FeedbackSection
          title="Passive voice"
          emptyMessage="No likely passive constructions were detected."
          isEmpty={result.passive_sentences.length === 0}
        >
          <ul>{result.passive_sentences.map((sentence) => <li key={sentence}>{sentence}</li>)}</ul>
        </FeedbackSection>

        <FeedbackSection
          title="Repeated first words"
          emptyMessage="No sentence-opening words were repeated."
          isEmpty={repeatedStarters.length === 0}
        >
          {repeatedStarters.map(([word, sentences]) => (
            <div key={word} className="finding">
              <strong>“{word}”</strong>
              <ul>{sentences.map((sentence) => <li key={sentence}>{sentence}</li>)}</ul>
            </div>
          ))}
        </FeedbackSection>

        <FeedbackSection
          title="Repeated nearby words"
          emptyMessage="No repeated content words were detected nearby."
          isEmpty={result.repetitive_words.length === 0}
        >
          <div className="tags">
            {result.repetitive_words.map((word) => <span key={word}>{word}</span>)}
          </div>
        </FeedbackSection>

        <FeedbackSection
          title="Similar opening structures"
          emptyMessage="No repeated opening structures were detected."
          isEmpty={openingRepetitions.length === 0 && overusedOpenings.length === 0}
        >
          {openingRepetitions.length > 0 && (
            <div className="finding">
              <strong>Consecutive matches</strong>
              <ul>
                {openingRepetitions.map((finding, index) => (
                  <li key={`${finding.category}-${index}`}>
                    <strong>{formatOpeningCategory(finding.category)}:</strong>{" "}
                    {finding.previous_sentence} / {finding.sentence}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {overusedOpenings.map((finding) => (
            <div key={finding.category} className="finding">
              <strong>
                {formatOpeningCategory(finding.category)} used {finding.frequency} times
              </strong>
              <ul>
                {finding.sentences.map((sentence) => <li key={sentence}>{sentence}</li>)}
              </ul>
            </div>
          ))}
        </FeedbackSection>
      </div>

    </section>
  );
}

export default Results;

function FeedbackSection({ title, emptyMessage, children, isEmpty }) {
  return (
    <section className="result-card">
      <h3>{title}</h3>
      {isEmpty ? <p className="quiet">{emptyMessage}</p> : children}
    </section>
  );
}

function Results({ result }) {
  if (!result) return null;

  const repeatedStarters = Object.entries(result.repeated_starters);
  const openingRepetitions = result.opening_repetitions.consecutive;

  return (
    <section className="results" aria-live="polite">
      <div className="results-heading">
        <div>
          <p className="eyebrow">Analysis</p>
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
          emptyMessage="No consecutive opening structures matched."
          isEmpty={openingRepetitions.length === 0}
        >
          <ul>
            {openingRepetitions.map((finding, index) => (
              <li key={`${finding.category}-${index}`}>
                <strong>{finding.category}:</strong> {finding.previous_sentence} / {finding.sentence}
              </li>
            ))}
          </ul>
        </FeedbackSection>
      </div>

      <p className="disclaimer">
        Automated feedback can be incomplete or incorrect. Use it as a revision prompt.
      </p>
    </section>
  );
}

export default Results;

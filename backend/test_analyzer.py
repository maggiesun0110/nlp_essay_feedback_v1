from backend.analyzer import analyze


def test_empty_text_returns_empty_feedback():
    result = analyze("   ")

    assert result["summary"] == {"sentence_count": 0, "word_count": 0}
    assert result["passive_sentences"] == []
    assert result["repeated_starters"] == {}


def test_analysis_reports_summary_and_repeated_starters():
    result = analyze("This draft is short. This draft is clear.")

    assert result["summary"]["sentence_count"] == 2
    assert result["summary"]["word_count"] == 8
    assert "this" in result["repeated_starters"]


def test_passive_voice_detection():
    result = analyze("The final report was reviewed by the committee.")

    assert result["passive_sentences"] == [
        "The final report was reviewed by the committee."
    ]

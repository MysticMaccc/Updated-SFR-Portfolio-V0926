import {
  Document, Page, Text, View, StyleSheet, Link,
} from '@react-pdf/renderer';
import type { PortfolioData, Experience } from '@/types';

/*
 * Reverse-chronological, single-column layout.
 * This is the format most preferred by recruiters and the safest
 * for ATS (applicant tracking system) parsing: standard section
 * headings, no columns, no graphics, most recent role first.
 */

const colors = {
  ink: '#1A1A1C',
  body: '#3A3A3C',
  muted: '#6E6E73',
  faint: '#AEAEB2',
  accent: '#007AFF',
  rule: '#D1D1D6',
  ruleLight: '#E5E5EA',
};

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    paddingTop: 42,
    paddingBottom: 52,
    paddingHorizontal: 50,
    fontSize: 9,
    color: colors.body,
  },

  /* Header */
  name: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    color: colors.ink,
    letterSpacing: -0.4,
  },
  jobTitle: {
    fontSize: 10.5,
    color: colors.accent,
    fontFamily: 'Helvetica-Bold',
    marginTop: 3,
    letterSpacing: 0.2,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
  },
  contactText: { fontSize: 8.5, color: colors.muted },
  contactLink: { fontSize: 8.5, color: colors.accent, textDecoration: 'none' },
  contactSep: { fontSize: 8.5, color: colors.faint, marginHorizontal: 5 },
  headerRule: {
    height: 1.5,
    backgroundColor: colors.ink,
    marginTop: 11,
    marginBottom: 13,
  },

  /* Sections */
  sectionTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: colors.ink,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  sectionRule: {
    height: 0.75,
    backgroundColor: colors.rule,
    marginBottom: 8,
  },
  section: { marginBottom: 13 },

  /* Summary */
  summary: { fontSize: 9, color: colors.body, lineHeight: 1.55 },

  /* Skills */
  skillRow: { flexDirection: 'row', marginBottom: 2.5 },
  skillCat: {
    fontSize: 8.5,
    fontFamily: 'Helvetica-Bold',
    color: colors.ink,
    width: 118,
  },
  skillList: { fontSize: 8.5, color: colors.body, flex: 1, lineHeight: 1.45 },

  /* Experience */
  expBlock: { marginBottom: 10 },
  expHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  expRole: { fontSize: 10.5, fontFamily: 'Helvetica-Bold', color: colors.ink },
  expDate: { fontSize: 8.5, color: colors.muted, marginTop: 1 },
  expCompany: { fontSize: 9.5, color: colors.accent, marginTop: 1.5, marginBottom: 4 },
  bullet: { flexDirection: 'row', marginBottom: 2.5 },
  bulletDash: { fontSize: 8.5, color: colors.faint, marginRight: 6, marginTop: 0.5 },
  bulletText: { fontSize: 8.5, color: colors.body, flex: 1, lineHeight: 1.45 },

  /* Projects */
  projBlock: { marginBottom: 6.5 },
  projTitleRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'baseline' },
  projTitle: { fontSize: 9.5, fontFamily: 'Helvetica-Bold', color: colors.ink },
  projTech: { fontSize: 7.5, color: colors.muted },
  projDesc: { fontSize: 8.5, color: colors.body, lineHeight: 1.45, marginTop: 1.5 },

  /* Certifications */
  certRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 },
  certTitle: { fontSize: 8.5, color: colors.ink, flex: 1, paddingRight: 10, lineHeight: 1.35 },
  certMeta: { fontSize: 8, color: colors.muted },

  /* Footer */
  footer: {
    position: 'absolute',
    bottom: 26,
    left: 50,
    right: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: colors.ruleLight,
    borderTopWidth: 0.75,
    paddingTop: 7,
  },
  footerText: { fontSize: 7.5, color: colors.faint },
});

function SectionHeading({ children }: { children: string }) {
  return (
    // minPresenceAhead keeps the heading from being orphaned at a page bottom
    <View minPresenceAhead={50}>
      <Text style={styles.sectionTitle}>{children}</Text>
      <View style={styles.sectionRule} />
    </View>
  );
}

function sortLatestFirst(experiences: Experience[]): Experience[] {
  return [...experiences].sort((a, b) => {
    if (a.is_current !== b.is_current) return a.is_current ? -1 : 1;
    return (parseInt(b.start_date) || 0) - (parseInt(a.start_date) || 0);
  });
}

export default function ResumePDF({ data }: { data: PortfolioData }) {
  const { profile, experiences, skills, projects, trainings } = data;

  const sortedExperiences = sortLatestFirst(experiences);

  const featured = projects.filter(p => p.featured).slice(0, 5);
  const selectedProjects = featured.length ? featured : projects.slice(0, 5);

  const grouped = skills.reduce<Record<string, string[]>>((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s.name);
    return acc;
  }, {});

  const sortedTrainings = [...trainings].sort(
    (a, b) => (parseInt(b.year ?? '') || 0) - (parseInt(a.year ?? '') || 0)
  );

  const name = profile?.name ?? 'Sherwin Christopher F. Roxas';

  const contactParts: { text: string; href?: string }[] = [
    profile?.email ? { text: profile.email, href: `mailto:${profile.email}` } : null,
    profile?.phone ? { text: profile.phone } : null,
    profile?.github ? { text: profile.github.replace('https://', ''), href: profile.github } : null,
    profile?.portfolio_url ? { text: profile.portfolio_url.replace('https://', ''), href: profile.portfolio_url } : null,
  ].filter(Boolean) as { text: string; href?: string }[];

  return (
    <Document title={`${name} — Resume`} author={name}>
      <Page size="A4" style={styles.page}>

        {/* Header */}
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.jobTitle}>{profile?.title ?? 'Full Stack Developer'}</Text>
        <View style={styles.contactRow}>
          {contactParts.map((c, i) => (
            <View key={c.text} style={{ flexDirection: 'row' }}>
              {i > 0 && <Text style={styles.contactSep}>·</Text>}
              {c.href
                ? <Link src={c.href} style={styles.contactLink}>{c.text}</Link>
                : <Text style={styles.contactText}>{c.text}</Text>}
            </View>
          ))}
        </View>
        <View style={styles.headerRule} />

        {/* 1. Professional Summary */}
        {profile?.bio && (
          <View style={styles.section}>
            <SectionHeading>Professional Summary</SectionHeading>
            <Text style={styles.summary}>{profile.bio}</Text>
          </View>
        )}

        {/* 2. Technical Skills — near the top for ATS keyword matching */}
        <View style={styles.section}>
          <SectionHeading>Technical Skills</SectionHeading>
          {Object.entries(grouped).map(([cat, names]) => (
            <View key={cat} style={styles.skillRow} wrap={false}>
              <Text style={styles.skillCat}>{cat}</Text>
              <Text style={styles.skillList}>{names.join(', ')}</Text>
            </View>
          ))}
        </View>

        {/* 3. Professional Experience — reverse chronological */}
        <View style={styles.section}>
          <SectionHeading>Professional Experience</SectionHeading>
          {sortedExperiences.map(exp => (
            // Blocks may wrap across pages (avoids large gaps); the role/company
            // header stays attached to the first bullets via minPresenceAhead.
            <View key={exp.id} style={styles.expBlock}>
              <View minPresenceAhead={44}>
                <View style={styles.expHeader}>
                  <Text style={styles.expRole}>{exp.role}</Text>
                  <Text style={styles.expDate}>
                    {exp.start_date} – {exp.is_current ? 'Present' : exp.end_date}
                  </Text>
                </View>
                <Text style={styles.expCompany}>{exp.company}</Text>
              </View>
              {exp.description.map((d, i) => (
                <View key={i} style={styles.bullet}>
                  <Text style={styles.bulletDash}>–</Text>
                  <Text style={styles.bulletText}>{d}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* 4. Selected Projects */}
        <View style={styles.section}>
          <SectionHeading>Selected Projects</SectionHeading>
          {selectedProjects.map(p => (
            <View key={p.id} style={styles.projBlock} wrap={false}>
              <View style={styles.projTitleRow}>
                <Text style={styles.projTitle}>{p.title}</Text>
                {p.tech_stack.length > 0 && (
                  <Text style={styles.projTech}>   {p.tech_stack.join(' · ')}</Text>
                )}
              </View>
              {p.description ? <Text style={styles.projDesc}>{p.description}</Text> : null}
            </View>
          ))}
        </View>

        {/* 5. Certifications & Training */}
        {sortedTrainings.length > 0 && (
          <View style={styles.section}>
            <SectionHeading>Certifications & Training</SectionHeading>
            {sortedTrainings.map(t => (
              <View key={t.id} style={styles.certRow} wrap={false}>
                <Text style={styles.certTitle}>{t.title}</Text>
                <Text style={styles.certMeta}>
                  {t.provider}{t.year ? `  ·  ${t.year}` : ''}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Footer — every page */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>{name}</Text>
          <Text
            style={styles.footerText}
            render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          />
        </View>
      </Page>
    </Document>
  );
}
